import { Shell } from '../../src/Shell';

Shell.ipc({
    'getLetter' (letter) {
        return `got: ${letter}`;
    },
    async 'getLetterAsync' (letter) {
        return `got: ${letter}`;
    }
})
