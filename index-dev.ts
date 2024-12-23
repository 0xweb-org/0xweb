import { App } from './src/app/App';


let app = new App();
let args = Array.from(process.argv);
let i = args.findIndex(x => x?.includes('index-dev'));

app
    .execute(args.slice(i + 1))
    .then(() => process.exit(0));
