import di from 'a-di';
import alot from 'alot';
import { Generator } from '@dequanto/gen/Generator';
import { ICommand } from '../ICommand';
import { PackageService } from '@core/services/PackageService';
import { $is } from '@dequanto/utils/$is';
import { $console } from '@core/utils/$console';

export function CRestore() {
    return <ICommand>{
        command: 'restore',

        description: [
            `Reinstall contracts from 0xweb.json`
        ],

        async process() {


            let packageService = di.resolve(PackageService);
            let packages = await packageService.getLocalPackages();

            await alot(packages)
                .forEachAsync(async (pkg, i) => {
                    $console.toast(`Install ${pkg.name} ${pkg.platform}`);

                    if ($is.Address(pkg.address) === false) {
                        $console.log(`Skip ${pkg.name}(${pkg.address}) as not valid address`);
                        return;
                    }
                    let pathPfx = '';
                    let pathFilename = '';
                    if (pkg.name.includes('/') === false) {
                        // 0xweb i 0x123 --name chainlink/feed-eth
                        // is installed into 0xweb/eth/chainlink/feed-eth/feed-eth.ts
                        pathPfx = pkg.name;
                        pathFilename = pkg.name;
                    } else {
                        pathPfx = pkg.name;
                        pathFilename = pkg.name.substring(pkg.name.lastIndexOf('/') + 1);
                    }

                    let output = pkg.main.replace(`${pathPfx}/${pathFilename}.ts`, '');
                    let generator = new Generator({
                        name: pkg.name,
                        platform: pkg.platform,
                        source: {
                            abi: pkg.address,
                        },
                        defaultAddress: pkg.address,
                        implementation: pkg.implementation,
                        output: output,
                        saveAbi: true
                    });
                    await generator.generate();
                })
                .toArrayAsync({ threads: 1 })
        }
    };
}
