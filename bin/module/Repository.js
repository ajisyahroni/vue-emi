const App = require('./App')
class Repository extends App {
    constructor() {
        super();
        this.repoDirectory = 'src/repositories';
        this.extension = "js"
    }

    async dirInit(dirPath = this.repoDirectory) {

        try {
            // create repo directory
            await this.mkDir(dirPath, { recursive: true });
            this.success('create repo dir');

        } catch (error) {
            this.error(error)
        }

    }

    async createFactory(repoName) {
        try {
            let importTemplate = '';
            let objectTemplate = '';

            let final = '';

            // repos directory 
            const repoPath = this.path.join(__dirname, 'template', 'repositories', 'template.repo.js');


            // read repo and evaluate template
            let repoTemplte = await this.readFile(repoPath, 'utf8');
            let add_template_literal = '`' + repoTemplte + '`';
            let template = eval(add_template_literal)

            await this.writeFile(`${this.repoDirectory}/${repoName}.${this.extension}`, template);

            // creating repo indexer
            let files = await this.readDir(this.repoDirectory)
            Array.from(files).map(file => {
                if (this.path.extname(file) == '.js') {
                    if (file !== `index.${this.extension}`) {
                        let basename = this.path.basename(file, `.${this.extension}`)
                        importTemplate += `import ${basename}Repo from './${file}';\n`;
                        objectTemplate += `export const ${basename} = ${basename}Repo;\n`;
                    }
                }
            })

            final = importTemplate + "\n" + objectTemplate;
            await this.writeFile(`${this.repoDirectory}/index.${this.extension}`, final);

            // on success
            this.success(`success create ${repoName} repository`)

        } catch (error) {
            this.error(error)
        }
    }

    async create(repoName) {
        let dirPath = this.repoDirectory
        let filePath = `${this.repoDirectory}/${repoName}.${this.extension}`;
        if (!this.checkExists(filePath)) {
            // creating repo dir 
            if (!this.existsSync(dirPath)) this.dirInit();
            // creating repo
            this.createFactory(repoName)
        }
    }


    async bulkCreate(arrayOfRepoName) {
        let dirPath = this.repoDirectory


        // creating repo dir 
        if (!this.existsSync(dirPath)) this.dirInit(dirPath);

        // looping an array of repo name
        Array.from(arrayOfRepoName).map(repoName => {

            let filePath = `${dirPath}/${repoName}.${this.extension}`;
            if (!this.checkExists(filePath)) {
                this.createFactory(repoName, dirPath)
            }

        })
    }
}

module.exports = Repository