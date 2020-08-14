#!/usr/bin/env node

// _____________________
// LOCAL NODE DEPENDENCY
const fs = require("fs");
const path = require("path");

// _____________________
// ONLINE DEPENDENCY
const yargs = require("yargs");
const prompts = require('prompts');
// end import here

/** 
 * ========================
 * local functions
 * ========================
 * */
// for consoling messages
const { clgError, clgInfo, clgSuccess } = require('./console');
// for promisifing
const { readFile, writeFile, readDir, mkDir } = require('./promisify')
/** 
 * ========================
 * end local functions
 * ========================
 * */

/**=======================
 * YARGS HERE
 * ======================
 */
const options = yargs
    .usage('Usage: --view <name>')
    .option("v", { alias: "view", describe: "your view name", type: "string" })
    .argv;

const componentOptions = yargs
    .usage('Usage: --component <name>')
    .option("c", { alias: "component", describe: "your component name", type: "string" })
    .argv;


const apiOptions = yargs
    .usage('Usage: --api')
    .option("a", { alias: "api", describe: "your api scaffolding" })
    .argv;

const repoOptions = yargs
    .usage('Usage: -repo')
    .option("r", { alias: "repo", describe: "your repository pattern scaffolding" })
    .argv;


/**=======================
 * end YARGS HERE
 * ======================
 */




const creatingView = async (viewName) => {
    try {
        // main logic
        const viewPath = path.join(__dirname, 'template', 'views', 'template.view.vue')
        let viewTemplate = await readFile(viewPath, 'utf8');
        let add_template_literal = '`' + viewTemplate + '`';
        let template = eval(add_template_literal);

        await writeFile(`src/views/${viewName}.vue`, template);
        // on succes
        console.log(`success creating ${viewName} view`);
    } catch (error) {
        console.log(error)
    }
}

const creatingComponent = async (componentName) => {
    try {
        // main logic
        const componentPath = path.join(__dirname, 'template', 'components', 'template.component.vue')

        // read and evaluate template
        let componentTemplate = await readFile(componentPath, 'utf8');
        let add_template_literal = '`' + componentTemplate + '`';
        let template = eval(add_template_literal);

        // write component 
        await writeFile(`src/components/${componentName}.vue`, template)
        // on success
        console.log(`Creating Vue Component: ${componentName}.vue`);
    } catch (error) {
        console.log(error)
    }
}

if (options.view) {
    let viewDirectory = 'src/views';
    if (fs.existsSync(viewDirectory)) {
        if (fs.existsSync(`${viewDirectory}/${options.view}.vue`)) {
            console.log(`${viewDirectory}/${options.view}.vue already exist`)
        }
        else {
            creatingView(options.view)
        }
    }
    else {
        console.log('creating src/views dir');
        fs.mkdir(viewDirectory, {
            recursive: true,
        }, (err) => {
            if (err) console.log('Error when creating directories')
            console.log('directory created')
            creatingView(options.view);
        })
    }
}

if (componentOptions.component) {
    const componentDirectory = 'src/components'
    if (fs.existsSync(componentDirectory)) {
        if (fs.existsSync(`${componentDirectory}/${componentOptions.component}.vue`)) {
            console.log(`src/components/${componentOptions.component}.vue already exist`)
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


/**
 * ================================
 * API SCAFFOLDING
 * note: axiosInit and fetchInit using configInit
 * ================================
 */
const apiDirectory = "src/api"
const configInit = async () => {
    const configPath = path.join(__dirname, 'template', 'api', 'template.config.js');
    // read and write for config template
    let configTemplate = await readFile(configPath, 'utf8')
    await writeFile(`${apiDirectory}/config.js`, configTemplate)
}

// fix
const axiosInit = async () => {
    const axiosPath = path.join(__dirname, 'template', 'api', 'template.axios.js');
    const indexPath = path.join(__dirname, 'template', 'api', 'template.index.axios.js');
    try {
        // read & write axios template
        let axiosTemplate = await readFile(axiosPath, 'utf8')
        await writeFile(`${apiDirectory}/axios.js`, axiosTemplate);

        // read & write index axios template
        indexTemplate = await readFile(indexPath, 'utf8');
        await writeFile(`${apiDirectory}/index.js`, indexTemplate)

        // read & write config tempalte
        configInit();

        // success
        console.log(`successfuly created axios api scaffolding `)
    } catch (error) {
        // catch error
        console.log('ERROR:', error)
    }
}
// fix
const fetchInit = async () => {
    const fetchPath = path.join(__dirname, 'template', 'api', 'template.fetch.js');
    const indexPath = path.join(__dirname, 'template', 'api', 'template.index.fetch.js');

    try {
        // read & write fetch template
        let fetchTemplate = await readFile(fetchPath, 'utf8');
        await writeFile(`${apiDirectory}/fetch.js`, fetchTemplate);

        // read & write index for fetch template
        let indexTemplate = await readFile(indexPath, 'utf8');
        await writeFile(`${apiDirectory}/index.js`, indexTemplate);

        // read & write generate config 
        configInit();

        console.log(`successfuly created fetch api scaffolding `)
    } catch (error) {
        // catch error
        console.log(error)
    }
}

// fix
const apiScaffoldingChoice = async () => {
    // create prompt options
    let choiceApiOptions = {
        type: 'select',
        name: 'value',
        message: 'Select rest api client ?',
        choices: [
            { title: 'axios', value: 'axios' },
            { title: 'fetch', value: 'fetch' },
        ],
        initial: 0
    }
    try {
        // get choice
        let choice = await prompts(choiceApiOptions);
        let apiDirectory = "src/api"

        switch (choice.value) {
            case "axios":
                await mkDir(apiDirectory, { recursive: true });
                axiosInit()
                break;

            case "fetch":
                await mkDir(apiDirectory, { recursive: true });
                fetchInit()
                break;
            default:
                console.log('cancel creating api scaffolding')
                break;
        }
    } catch (error) {
        console.log('ERROR:', error)
    }
}
if (apiOptions.api) {
    apiScaffoldingChoice();
}

/**
 * ++++++++++++++++++++++++++++
 * END API SCAFFOLDING
 * ++++++++++++++++++++++++++++
 */



/**
 * =================================
 * REPOSITORY SCAFFOLDING
 * =================================
 */

const repoScaffolding = async (repoName) => {

    try {
        let importTemplate = '';
        let objectTemplate = '';

        let final = '';
        // repos directory 
        let repoDirectory = 'src/repositories'
        const repoPath = path.join(__dirname, 'template', 'repositories', 'template.repo.js');

        // create repo directory
        await mkDir(repoDirectory, { recursive: true })
        // read repo and evaluate template
        let repoTemplte = await readFile(repoPath, 'utf8');
        let add_template_literal = '`' + repoTemplte + '`';
        let template = eval(add_template_literal)

        await writeFile(`${repoDirectory}/${repoName}.js`, template);

        // creating repo indexer
        let files = await readDir(repoDirectory)
        Array.from(files).map(file => {
            if (path.extname(file) == '.js') {
                if (file !== "index.js") {
                    let basename = path.basename(file, '.js')
                    importTemplate += `import ${basename}Repo from './${file}';\n`;
                    objectTemplate += `export const ${basename} = ${basename}Repo;\n`;
                }
            }
        })

        final = importTemplate + "\n" + objectTemplate;
        await writeFile(`${repoDirectory}/index.js`, final);

        // on success
        console.log('success create repo', repoName)
    } catch (error) {
        console.log(error)
    }

}

if (repoOptions.repo) {
    let existCondition = fs.existsSync('src/api/index.js') && (fs.existsSync('src/api/axios.js') || fs.existsSync('src/api/fetch.js'));
    if (existCondition) {
        // if api scaffolding are exist
        repoScaffolding(repoOptions.repo);
    }
    else {
        console.log('please run this command first')
        console.log('emi -a')
    }
}

/**
 * +++++++++++++++++++++++++
 * END REPO SCAFOLDING
 * +++++++++++++++++++++++++
 */