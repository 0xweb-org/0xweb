process.on('message', (message) => {
    
    switch (message.method) {
        case 'echo': {
            let [ text ] = message.args;
            process.send({
                id: message.id,
                data: `echo:${text}`
            });
            break;
        }
        case 'exception': {
            (willThrow).bar();
            break;
        }
        case 'exit-error': {
            process.exit(1);
            break;
        }
    }
});
