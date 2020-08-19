const App = require('./App')
class Api extends App {
    constructor() {
        super();

        this.apiDirectory = "src/service";

        // property for prompt
        this.choiceApiOptions = {
            type: 'select',
            name: 'value',
            message: 'Select rest api client ?',
            choices: [
                { title: 'axios', value: 'axios' },
                { title: 'fetch', value: 'fetch' },
            ],
            initial: 0
        }
        // end property prompt

    }

    async dirInit(dirPath = this.apiDirectory) {
        try {
            await this.mkDir(dirPath, { recursive: true });
            this.success(`creating ${dirPath} dir`)
        } catch (error) {
            this.error(error)
        }
    }

    async init() {
        try {

            // init logic
            let choice = await this.prompts(this.choiceApiOptions);
            // control flow
            switch (choice.value) {

                case "axios":
                    await this.dirInit();
                    await this.apiConfig();
                    await this.axiosInit();

                    break;

                case "fetch":
                    await this.dirInit();
                    await this.apiConfig();
                    await this.fetchInit();

                    break;

                default:
                    this.info('cancel creating api scaffolding')
                    break;
            }

            // end init

        } catch (error) {
            this.error(error)
        }
    }

    async apiConfig() {

        const configPath = this.path.join(__dirname, 'template', 'api', 'template.config.js');
        // read and write for config template
        let configTemplate = await this.readFile(configPath, 'utf8')
        await this.writeFile(`${this.apiDirectory}/config.js`, configTemplate)

    }
    async axiosInit() {
        try {

            const axiosPath = this.path.join(__dirname, 'template', 'api', 'template.axios.js');
            const indexPath = this.path.join(__dirname, 'template', 'api', 'template.index.axios.js');

            // read & write axios template
            let axiosTemplate = await this.readFile(axiosPath, 'utf8')
            await this.writeFile(`${this.apiDirectory}/axios.js`, axiosTemplate);

            // read & write index axios template
            let indexTemplate = await this.readFile(indexPath, 'utf8');
            await this.writeFile(`${this.apiDirectory}/index.js`, indexTemplate)


            // success
            this.success(`successfuly created axios api scaffolding `)

        } catch (error) {
            // catch error
            this.error(error)
        }

    }
    async fetchInit() {

        try {
            const fetchPath = this.path.join(__dirname, 'template', 'api', 'template.fetch.js');
            const indexPath = this.path.join(__dirname, 'template', 'api', 'template.index.fetch.js');

            // read & write fetch template
            let fetchTemplate = await this.readFile(fetchPath, 'utf8');
            await this.writeFile(`${this.apiDirectory}/fetch.js`, fetchTemplate);

            // read & write index for fetch template
            let indexTemplate = await this.readFile(indexPath, 'utf8');
            await this.writeFile(`${this.apiDirectory}/index.js`, indexTemplate);

            // on success
            this.success(`successfuly created fetch api scaffolding `)

        } catch (error) {
            // catch error
            this.error(error)
        }
    }

}

module.exports = Api