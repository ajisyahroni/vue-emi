#!/usr/bin/env node

// _____________________
// LOCAL NODE DEPENDENCY
const fs = require("fs");
const path = require("path");
// _____________________
// ONLINE DEPENDENCY
const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
// end import here

/**=======================
 * YARGS HERE
 * ======================
 */
const options = yargs
    .usage('Usage: -view <name>')
    .option("v", { alias: "view", describe: "your view name", type: "string" })
    .argv;

const componentOptions = yargs
    .usage('Usage: -component <name>')
    .option("c", { alias: "component", describe: "your component name", type: "string" })
    .argv;
// end here

/**
 * ==========================
 * BOXEN OPTIONS
 * ==========================
 */
const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555"
};
// END BOXEN 

const creatingView = (viewName) => {
    // main logic
    const viewPath = path.join(__dirname, 'template.view.vue')
    fs.readFile(viewPath, 'utf8', (err, data) => {
        if (err) console.log(err)
        let add_template_literal = '`' + data + '`'
        let template = eval(add_template_literal)
        fs.writeFile(`src/views/${viewName}.vue`, template, (err) => {
            if (err) console.log(err);

            // on success
            // message on success
            const greeting = chalk.white.bold(`Creating Vue View: ${viewName}.vue`);
            const msgBox = boxen(greeting, boxenOptions);
            console.log(msgBox);
        })
    })
}

const creatingComponent = (componentName) => {
    // main logic
    const componentPath = path.join(__dirname, 'template.component.vue')
    fs.readFile(componentPath, 'utf8', (err, data) => {
        if (err) console.log(err)
        let add_template_literal = '`' + data + '`'
        let template = eval(add_template_literal)
        fs.writeFile(`src/components/${componentName}.vue`, template, (err) => {
            if (err) console.log(err);

            // on success
            // message on success
            const greeting = chalk.white.bold(`Creating Vue Component: ${componentName}.vue`);
            const msgBox = boxen(greeting, boxenOptions);
            console.log(msgBox);
        })
    })
}

if (options.view) {
    if (fs.existsSync('src/views')) {
        creatingView(options.view)
    }
    else {
        console.log('creating src/views dir');
        fs.mkdir('src/views', {
            recursive: true,
        }, (err) => {
            if (err) console.log('Error when creating directories')
            console.log('directory created')
            creatingView(options.view);
        })
    }
}

if (componentOptions.component) {
    if (fs.existsSync('src/components')) {
        creatingComponent(componentOptions.component)
    }
    else {
        console.log('creating src/components dir');
        fs.mkdir('src/components', {
            recursive: true,
        }, (err) => {
            if (err) console.log('Error when creating directories')
            console.log('directory created')
            creatingComponent(componentOptions.component);
        })
    }
}