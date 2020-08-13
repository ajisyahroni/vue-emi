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
const prompts = require('prompts');
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


const apiOptions = yargs
    .usage('Usage: -api')
    .option("a", { alias: "api", describe: "your api scaffolding" })
    .argv;

const repoOptions = yargs
    .usage('Usage: -repo')
    .option("r", { alias: "repo", describe: "your repository pattern scaffolding" })
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
const boxenErrorOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "red",
    backgroundColor: "#555555"
};
// END BOXEN 

const creatingView = (viewName) => {
    // main logic
    const viewPath = path.join(__dirname, 'template', 'views', 'template.view.vue')
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
    const componentPath = path.join(__dirname, 'template', 'components', 'template.component.vue')
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
        if (fs.existsSync(`src/views/${options.view}.vue`)) {

            let boxenError = chalk.white.bold(`src/views/${options.view}.vue already exist`);
            let msgErrorBox = boxen(boxenError, boxenErrorOptions);
            console.log(msgErrorBox)
        }
        else {
            creatingView(options.view)
        }
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
        if (fs.existsSync(`src/components/${componentOptions.component}.vue`)) {
            let boxenError = chalk.white.bold(`src/components/${componentOptions.component}.vue already exist`);
            let msgErrorBox = boxen(boxenError, boxenErrorOptions);
            console.log(msgErrorBox)
        }
        else {
            creatingComponent(componentOptions.component)
        }

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


const axiosInit = () => {
    const axiosPath = path.join(__dirname, 'template', 'api', 'template.axios.js');
    const indexPath = path.join(__dirname, 'template', 'api', 'template.index.axios.js');

    fs.readFile(axiosPath, 'utf8', (err, axiosTemplate) => {
        if (err) console.log(err)

        fs.writeFile(`src/api/axios.js`, axiosTemplate, (err) => {
            if (err) console.log(err);
        })
    })

    fs.readFile(indexPath, 'utf8', (err, indexTemplate) => {
        if (err) console.log(err)

        fs.writeFile(`src/api/index.js`, indexTemplate, (err) => {
            if (err) console.log(err);
        })
    })
}

const fetchInit = () => {
    const fetchPath = path.join(__dirname, 'template', 'api', 'template.fetch.js');
    const indexPath = path.join(__dirname, 'template', 'api', 'template.index.fetch.js');

    fs.readFile(fetchPath, 'utf8', (err, fetchTemplate) => {
        if (err) console.log(err)

        fs.writeFile(`src/api/fetch.js`, fetchTemplate, (err) => {
            if (err) console.log(err);
        })
    })

    fs.readFile(indexPath, 'utf8', (err, indexTemplate) => {
        if (err) console.log(err)
        fs.writeFile(`src/api/index.js`, indexTemplate, (err) => {
            if (err) console.log(err);
        })
    })
}

if (apiOptions.api) {
    fs.mkdir('src/api', {
        recursive: true
    }, (err) => {
        if (err) console.log('error when creating directories');
        console.log('creating api directory');

        // ask user to select choice
        prompts({
            type: 'select',
            name: 'value',
            message: 'Select rest api client ?',
            choices: [
                { title: 'axios', value: 'axios' },
                { title: 'fetch', value: 'fetch' },
            ],
            initial: 0
        }).then(response => {
            console.log("creating api axios scaffolding", response.value)
            switch (response.value) {
                case "axios":
                    axiosInit()
                    break;

                case "fetch":
                    fetchInit()
                    break;
                default:
                    fetchInit();
                    break;
            }
        })

    })
}

if (repoOptions.repo) {
    if (fs.existsSync('src/api/index.js') && (fs.existsSync('src/api/axios.js') || fs.existsSync('src/api/fetch.js'))) {
        // if api scaffolding are exist
        let importTemplate = '';
        let objectTemplate = ''

        let final = ''


        fs.mkdir('src/repositories', { recursive: true }, (err) => {
            if (err) console.log(err);
            const repoPath = path.join(__dirname, 'template', 'repositories', 'template.repo.js')
            fs.readFile(repoPath, 'utf8', (err, data) => {
                if (err) console.log(err)
                let add_template_literal = '`' + data + '`'
                let template = eval(add_template_literal)
                fs.writeFile(`src/repositories/${repoOptions.repo}.js`, template, (err) => {
                    if (err) console.log(err);
                    console.log('succesfuly create', repoOptions.repo);
                    fs.readdir('src/repositories', (err, files) => {
                        Array.from(files).forEach(file => {
                            if (path.extname(file) == '.js') {
                                if (file !== "index.js") {
                                    let basename = path.basename(file, '.js')
                                    importTemplate += `import ${basename} from './${file}';\n`;
                                    objectTemplate += basename + ','
                                }
                            }
                        })
                        let object = '{' + objectTemplate + '}'
                        final = importTemplate + "\n" + "export default" + object;
                        console.log(final)
                        fs.writeFile(`src/repositories/index.js`, final, (err) => {
                            if (err) console.log(err);
                            console.log('succesfuly create')
                        })
                    })
                })
            })
        })
    }
    else {
        let boxenError = chalk.white.bold(`emi -a`);
        let msgErrorBox = boxen(boxenError, boxenErrorOptions);
        console.log('please run this command first')
        console.log(msgErrorBox)
    }

}