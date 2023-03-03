require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")

require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-ethers");
require("@0xweb/hardhat")

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        version: "0.8.2",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
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
