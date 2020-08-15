#!/usr/bin/env node

// _____________________
// ONLINE DEPENDENCY
const yargs = require("yargs");
const chalk = require('chalk');

let hint = (hint) => {
    return chalk.green(hint)
}

// end import here



const View = require('./module/View');
const Component = require('./module/Component');
const Api = require("./module/Api");
const Repo = require('./module/Repository');

let comp = new Component();
let view = new View();
let api = new Api();
let repo = new Repo();



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


    /**
     * =======================================
     * 
     * VIEW CMD
     * 
     * =======================================
     * 
     */

    .command('make:view', hint('create a new view'), function (yargs) {
        let dirOption = yargs.option('d', { alias: 'dir', describe: 'directory for creating views', type: "string" }).argv

        let arrayOfViews = Array.from(yargs.argv._).remove('make:view');

        let creatingViews = () => {
            view.bulkCreate(arrayOfViews)
        }
        let withDir = () => {

            view.bulkCreate(arrayOfViews, dirOption.dir)
        }
        dirOption.dir ? withDir() : creatingViews();
    })


    /**
     * =======================================
     * 
     * COMPONENT CMD
     * 
     * =======================================
     * 
     */

    .command('make:comp', hint('creating a new component'), function (yargs) {
        let dirOption = yargs.option('d', { alias: 'dir', describe: 'directory for creating components', type: "string" }).argv

        let arrayOfComponents = Array.from(yargs.argv._).remove('make:comp');

        let creatingViews = () => {
            comp.bulkCreate(arrayOfComponents)
        }
        let withDir = () => {
            comp.bulkCreate(arrayOfComponents, dirOption.dir)
        }
        dirOption.dir ? withDir() : creatingViews();
    })



    /**
     * =======================================
     * 
     * API CMD
     * 
     * =======================================
     * 
     */


    .command('make:api', hint('creating api scaffolding'), function (yargs) {
        api.init();
    })



    /**
     * =======================================
     * 
     * REPO CMD
     * 
     * =======================================
     * 
     */


    .command('make:repo', hint('creating repo scaffolding'), function (yargs) {
        let arrayOfRepo = Array.from(yargs.argv._).remove('make:repo');
        repo.bulkCreate(arrayOfRepo)
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
