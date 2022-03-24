import { $machine } from './$machine';
import { $cli } from './$cli';

export namespace $secret {
    export async function get() {

        let pin = $cli.getParamValue('p');
        if (pin == null || pin.length === 0) {
            return null;
        }
        let id = await $machine.id();
        return `${id}:${pin}`;
    }
}
