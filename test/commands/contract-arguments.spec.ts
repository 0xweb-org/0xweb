import { UTest } from "atma-utest";
import { CommandsHandler } from "@core/commands/CommandsHandler";
import { CContract } from "@core/commands/list/CContract";
import { CHelp } from "@core/commands/list/CHelp";
import { ContractService } from "@core/services/ContractService";
import { $validate } from "@core/utils/$validate";
import { $cli } from "@core/utils/$cli";
import { $promise } from "@dequanto/utils/$promise";

UTest.create({
    async "resolves calldata alternatives and validates canonical option names"() {
        let original = { platforms: $validate.platforms, ask: $cli.ask };
        try {
            $validate.platforms = () => ["hardhat"];
            $cli.ask = async () => undefined;
            let handler = new CommandsHandler()
                .register(CContract())
                .register(CHelp());
            let help = await handler.findCommand(["c", "slot"], { help: true });
            notEq_(help.params.command.params["--json"], null);
            notEq_(help.params.command.params["-c, --chain"], null);

            let positional = await handler.findCommand(
                ["c", "calldata-parse", "ERC20", "0x1234"],
                {},
            );
            deepEq_(positional.args, ["ERC20", "0x1234"]);
            let named = await handler.findCommand(["c", "calldata-parse", "ERC20"], {
                calldata: "0x1234",
            });
            deepEq_(named.args, positional.args);

            let restore = await handler.findCommand(
                ["c", "dump-restore", "Counter"],
                { f: "snapshot.JSON" },
            );
            eq_(restore.params.file, "snapshot.JSON");

            let slots = await handler.findCommand(["c", "slot", "Counter", "0"], {
                c: "hardhat",
            });
            eq_(slots.params.chain, "hardhat");

            let logs = await handler.findCommand(
                ["c", "logs", "Counter", "Incremented"],
                { format: "csv", c: "hardhat" },
            );
            eq_(logs.params.chain, "hardhat");
            eq_(logs.params.format, "csv");

            let invalidCommands = [
                { args: ["c", "calldata-parse", "ERC20"], params: {} },
                { args: ["c", "dump-restore", "Counter"], params: {} },
                {
                    args: ["c", "dump-restore", "Counter"],
                    params: { f: "snapshot.txt" },
                },
                {
                    args: ["c", "logs", "Counter", "Incremented"],
                    params: { format: "yaml" },
                },
                { args: ["c", "slot", "Counter", "0"], params: { c: "invalid-chain" } },
            ];
            for (let test of invalidCommands) {
                let { error } = await $promise.caught(
                    handler.findCommand(test.args, test.params),
                );
                notEq_(error, null);
            }
        } finally {
            $validate.platforms = original.platforms;
            $cli.ask = original.ask;
        }
    },
    async "preserves large storage indices and rejects invalid ranges before RPC calls"() {
        let requests: string[][] = [];
        let address = "0x0000000000000000000000000000000000000001";
        let service = new ContractService({
            config: { env: "api" },
            chain: {
                client: {
                    async getStorageAt(_address, slot) {
                        requests.push([slot]);
                        return "0x00";
                    },
                    async getStorageAtBatched(_address, slots) {
                        requests.push(slots);
                        return slots.map(() => "0x00");
                    },
                },
            },
        } as any);
        await service.slot(address, "9007199254740993");
        await service.slot(address, "9007199254740993-9007199254740994");
        deepEq_(requests, [
            ["0x20000000000001"],
            ["0x20000000000001", "0x20000000000002"],
        ]);
        let invalidRanges = [
            "-1",
            "2-1",
            "1.5",
            "0-2-3",
            "no-slot",
            `0x1${"0".repeat(64)}`,
        ];
        for (let range of invalidRanges) {
            let { error } = await $promise.caught(service.slot(address, range));
            notEq_(error, null);
        }
        eq_(requests.length, 2);
        let withoutChain = new ContractService({ config: {} } as any);
        let { error } = await $promise.caught(withoutChain.slot(address, "0"));
        notEq_(error, null);
        has_(error.message, "--chain");
    },
    async "rejects incomplete and unsupported storage overrides"() {
        let service = new ContractService({ config: {} } as any);
        let overrides = [{ slot: "0" }, { type: "uint256" }, { offset: "1" }];
        for (let info of overrides) {
            let { error } = await $promise.caught(
                service.varLoad("Counter", "counter", info),
            );
            notEq_(error, null);
        }
        let { error } = await $promise.caught(
            service.varSet("Counter", "counter", "1", { type: "uint256" }),
        );
        notEq_(error, null);
        has_(error.message, "--type");
    },
});
