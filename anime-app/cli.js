const yargs = require('yargs/yargs');
const app = require('./app.js');

yargs(process.argv.slice(2))
    .usage('$0: Usage <command> [options]')
    .command(
    // searches for keyword input by user
    'search <keyword>',
    'search for animes',
    (yargs) => {
        return (
            yargs
                .positional('keyword', {
                    describe: 'anime to be searched for',
                    type: 'string'
                })
        );
    },

    // handler functions for handling parsed command, command arguments, and options
    (args) => {
            // invoke function to perform search
            app.searchAnime(args);
    }
)
    .help().argv;