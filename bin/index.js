#!/usr/bin/env node

// _____________________
// ONLINE DEPENDENCY
const yargs = require("yargs");
// end import here

// global helpers
const remove = require("./module/helper/array");
const hint = require("./module/helper/hint")
const banner = require("./module/helper/banner")

// set to array prototype
Array.prototype.remove = remove;



const View = require('./module/View');
const Component = require('./module/Component');
const Api = require("./module/Api");
const Repo = require('./module/Repository');
const Logger = require('./module/Logger');
const Git = require('./module/Git')

let comp = new Component();
let view = new View();
let api = new Api();
let repo = new Repo();
let logger = new Logger();
let git = new Git();








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
        git.checkFiles(() => {
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
        git.checkFiles(() => {
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
        git.checkFiles(() => {
            api.init();
        })
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
        git.checkFiles(() => {
            let arrayOfRepo = Array.from(yargs.argv._).remove('make:repo');
            repo.bulkCreate(arrayOfRepo)
        })
    })

    /**
   * =======================================
   * 
   * Logger CMD
   * 
   * =======================================
   * 
   */

    .command('make:logger', hint('creating beautiful logger'), function (yargs) {
        git.checkFiles(()=>{
            logger.create();
        })
    })





    .help('help')
    .wrap(null)
    .argv


checkCommands(yargs, argv, 1)
function checkCommands(yargs, argv, numRequired) {
    if (argv._.length < numRequired) {
        banner()
        yargs.showHelp()
    } else {
        // check for unknown command
    }
}
