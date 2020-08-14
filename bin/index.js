#!/usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk');

let hint = (hint) => {
    return chalk.green(hint)
}

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

const log = console.log;

var argv = yargs
    .usage('usage: $0 <command>')
    .command('make:view', hint('create a new view'), function (yargs) {
        let dirOption = yargs.option('d', { alias: 'dir', describe: 'directory for creating views', type: "string" }).argv


        let creatingViews = () => {
            let views = Array.from(yargs.argv._).remove('make:view');
            Array.from(views).map(val => {
                log(val)
            })
        }
        let withDir = () => {
            log('withdir')
        }
        dirOption.dir ? withDir() : creatingViews();
    })

    .command('make:comp', hint('creating a new component'), function (yargs) {
        let dirOption = yargs.option('d', { alias: 'dir', describe: 'directory for creating components', type: "string" }).argv


        let creatingViews = () => {
            let views = Array.from(yargs.argv._).remove('make:comp');
            Array.from(views).map(val => {
                log(val)
            })
        }
        let withDir = () => {
            log('withdir')
        }
        dirOption.dir ? withDir() : creatingViews();
    })
    .command('make:api', hint('creating api scaffolding'), function (yargs) {
        console.log('creating api scaffolding')
    })
    .help('help')
    .wrap(null)
    .argv

checkCommands(yargs, argv, 1)
function checkCommands(yargs, argv, numRequired) {
    if (argv._.length < numRequired) {
        console.log(chalk.green('ahahh'))
        yargs.showHelp()
    } else {
        // check for unknown command
    }
}