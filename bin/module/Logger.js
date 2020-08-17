const App = require("./App");

class Logger extends App {
    constructor() {
        super();
        this.loggerDir = "src/plugins"
    }
    async dirInit(dirPath = this.loggerDir) {
        let t = this;
        await t.mkDir(t.loggerDir)
    }
    async create() {
        let t = this;

        try {
            t.dirInit();
            const loggerPath = this.path.join(__dirname, 'template', 'logger', 'template.logger.js')
            const loggerTemplate = await this.readFile(loggerPath, 'utf8');

            await this.writeFile(`${this.loggerDir}/logger.js`, loggerTemplate);
            this.success('success create logger plugins');
        } catch (error) {
            this.error(error)
        }
    }
}

module.exports = Logger