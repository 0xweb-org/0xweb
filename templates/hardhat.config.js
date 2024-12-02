require("@0xweb/hardhat");

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.22",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200
                    }
                }
            }
        ]
    },
    networks: {
        hardhat: {
            chainId: 1337
        },
        localhost: {
            chainId: 1337
        }
    }
};
