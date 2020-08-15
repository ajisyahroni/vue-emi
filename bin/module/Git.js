const App = require("./App");
const { exec } = require('child_process')

class Git extends App {
    constructor() {
        super();
        // this.isGitRepo();
        // this.uncommited();
        // this.untracked();
    }

    isGitRepo() {
        return this.existsSync('.git')
    }

    async untracked() {
        exec('git ls-files --others --exclude-standard', (err, stdout, stderr) => {
            if (err) console.log(err);
            if (stderr) console.log(stderr);
            console.log(stdout)
        })
    }

    async uncommited() {
        exec('git diff --name-only', (err, stdout, stderr) => {
            if (err) console.log(err);
            if (stderr) console.log(stderr);
            console.log(stdout)
        })
    }
}

// let git = new Git();



module.exports = Git