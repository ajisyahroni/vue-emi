const App = require('./App')
class Component extends App {
    constructor() {
        super();
        this.componentDir = "src/components";
        this.extension = "vue";


    }

    // dir init
    async dirInit(dirPath = this.componentDir) {
        try {
            await this.mkDir(dirPath, { recursive: true });
            this.success(`creating ${dirPath} dir`);

        } catch (error) {
            this.error(error)
        }
    }



    // create view
    async createFactory(componentName, dirName = this.componentDir) {
        try {

            /**
             * ==========================
             * CREATE SINGLE COMPONENT
             * ==========================
             */

            // component path
            const componentPath = this.path.join(__dirname, 'template', 'components', 'template.component.vue')

            // read and evaluate template
            let componentTemplate = await this.readFile(componentPath, 'utf8');
            let add_template_literal = '`' + componentTemplate + '`';
            let template = eval(add_template_literal);

            // write template
            await this.writeFile(`${dirName}/${componentName}.${this.extension}`, template);

            // on succes
            this.success(`success creating ${componentName} component`);

            /**
             * ==========================
             * END CREATE SINGLE COMPONENT
             * ==========================
             */


        } catch (error) {
            this.error(error)
        }
    }


    async create(componentName) {
        let dirPath = `${this.componentDir}`;
        let filePath = `${this.componentDir}/${componentName}.${this.extension}`;


        if (!this.checkExists(filePath)) {
            // creating components dir 
            if (!this.existsSync(dirPath)) this.dirInit();
            // creating components
            this.createFactory(componentName)
        }

    }


    async bulkCreate(arrayOfComponentName, dirDestination = "") {
        let dirPath = `${this.componentDir}/${dirDestination}`


        // creating components dir 
        if (!this.existsSync(dirPath)) this.dirInit(dirPath);

        // looping an array of components name
        Array.from(arrayOfComponentName).map(componentName => {

            let filePath = `${dirPath}/${componentName}.${this.extension}`;
            if (!this.checkExists(filePath)) {
                this.createFactory(componentName, dirPath)
            }

        })
    }





}


module.exports = Component;