



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

// task('compile', "Compiles the entire project, building all artifacts")
//     .addOptionalParam("sources")
//     .addOptionalParam("artifacts")
//     .setAction(async (compilationArgs, { run, config }) => {

//         if (compilationArgs.sources) {
//             config.paths.sources = process.cwd() + compilationArgs.sources;
//         }
//         if (compilationArgs.artifacts) {
//             config.paths.artifacts = process.cwd() + compilationArgs.artifacts;
//         }
//         const compilationTasks = await run('compile:get-compilation-tasks');
//         for (const compilationTask of compilationTasks) {
//             await run(compilationTask, compilationArgs);
//         }
//     })
