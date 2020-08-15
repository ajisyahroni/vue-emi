const App = require('./App')
class View extends App {
    constructor() {
        super();
        this.viewDir = "src/views";
        this.extension = "vue";

    }

    // dir init
    async dirInit(dirPath = this.viewDir) {
        try {
            await this.mkDir(dirPath, { recursive: true })
            this.success(`creating ${dirPath} dir`)
        } catch (error) {
            this.error(error)
        }
    }

    // create factory view
    async createFactory(viewName, dirName = this.viewDir) {
        try {

            /**
             * ==========================
             * CREATE SINGLE VIEW
             * ==========================
             */

            // view path
            const viewPath = this.path.join(__dirname, 'template', 'views', 'template.view.vue')

            // read template and eval
            let viewTemplate = await this.readFile(viewPath, 'utf8');
            let add_template_literal = '`' + viewTemplate + '`';
            let template = eval(add_template_literal);

            // write template
            await this.writeFile(`${dirName}/${viewName}.${this.extension}`, template);

            // on succes
            this.success(`success creating ${viewName} view`);

            /**
            * ==========================
            * END CREATE SINGLE VIEW
            * ==========================
            */


        } catch (error) {
            this.error(error)
        }
    }

    async create(viewName) {
        let dirPath = `${this.viewDir}`;
        let filePath = `${this.viewDir}/${viewName}.${this.extension}`;


        if (!this.checkExists(filePath)) {
            // creating views dir 
            if (!this.existsSync(dirPath)) this.dirInit();
            // creating view
            this.createFactory(viewName)
        }

    }

    async bulkCreate(arrayOfViewName, dirDestination = "") {
        let dirPath = `${this.viewDir}/${dirDestination}`


        // creating views dir 
        if (!this.existsSync(dirPath)) this.dirInit(dirPath);

        // looping an array of view name
        Array.from(arrayOfViewName).map(viewName => {

            let filePath = `${dirPath}/${viewName}.${this.extension}`;
            if (!this.checkExists(filePath)) {
                this.createFactory(viewName, dirPath)
            }

        })
    }



}


module.exports = View;