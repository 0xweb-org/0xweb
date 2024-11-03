import { Directory, File } from 'atma-io';
import { PackageService } from './PackageService';
import { IPlatformTools } from '@dequanto/chains/PlatformFactory';
import { HardhatProvider } from '@dequanto/hardhat/HardhatProvider';
import { $require } from '@dequanto/utils/$require';
import { EoAccount } from '@dequanto/models/TAccount';
import { ChainAccountService } from '@dequanto/ChainAccountService';
import { ContractVerifier } from '@dequanto/explorer/ContractVerifier';
import { Deployments } from '@dequanto/contracts/deploy/Deployments';

export class HardhatService {
    constructor (public chain: IPlatformTools) {

    }

    async compile (mix: string) {
        let source = await this.getCompilationSource(mix);
        let provider = new HardhatProvider();
        let result = await provider.compileSol(source.path);
        return result;
    }

    async deploy (mix: string, params: { deployer: string }) {

        let accounts = new ChainAccountService()
        let account = await accounts.get(params.deployer);
        $require.notNull(account?.address, `Account ${ params.deployer } not resolved`);
        let args = [];
        for (let key in params) {
            let match = /^arg(?<index>\d)$/.exec(key);
            if (match) {
                args[Number(match.groups.index)] = params[key];
            }
        }

        let source = await this.getCompilationSource(mix);
        let provider = new HardhatProvider();
        let result = await provider.deploySol(source.path, {
            arguments: args,
            client: this.chain.client,
            deployer: account as EoAccount,
        });
        return result;
    }

    async verify () {
        let deployments = new Deployments(this.chain.client, null);
        let verifier = new ContractVerifier(deployments, this.chain.explorer);
        verifier.ensure(Ctor)
    }

    private async ensureSolidityVersion (solPath: string) {

    }

    private async getCompilationSource (mix: string): Promise<{
        path: string
        contractName?: string
    }> {
        let isName = /^[\w_]+$/.test(mix);
        if (isName) {
            let pkgService = new PackageService();
            let pkg = await pkgService.getPackage(mix);
            $require.notNull(pkg, `Package "${mix}" not installed`);
            let tsMain = pkg.main;
            let $base = tsMain.replace(/[^\\/]+$/g, '');
            let files = await Directory.readFiles($base, '*.sol');
            if (files.length === 1) {
                return {
                    path: files[0].uri.toString(),
                    contractName: null
                }
            }
        }
        let file = new File(mix);
        let path = file.uri.toString();
        if (await file.existsAsync() === false) {
            throw new Error(`File ${path} not found`);
        }
        return {
            path,
            contractName: null
        };
    }

}
