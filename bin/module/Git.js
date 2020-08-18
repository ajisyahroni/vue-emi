const App = require("./App");
const { exec } = require('child_process')
const chalk = require('chalk');
const prompts = require('prompts')
const log = console.log
const redLog = (...logs) => {
    return log(chalk.red(...logs))
}
const greenLog = (...logs) => {
    return log(chalk.green(...logs))
}
const warnLog = (...logs) => {
    return log(chalk.yellow(...logs))
}

class Git extends App {
    constructor() {
        super();
    }

    isGitRepo() {
        return this.existsSync('.git')
    }

    // async untracked() {
    //     exec('git ls-files --others --exclude-standard', (err, stdout, stderr) => {
    //         if (err) console.log(err);
    //         if (stderr) console.log(stderr);
    //         console.log(stdout)
    //     })
    // }

    // async uncommited() {
    //     exec('git diff --name-only', (err, stdout, stderr) => {
    //         if (err) console.log(err);
    //         if (stderr) console.log(stderr);
    //         console.log(stdout)
    //     })
    // }
    gitStatus(gitStatusCallback) {
        exec('git status -s', (err, stdout, stderr) => {
            if (err) console.log(err);
            if (stderr) console.log(stderr);
            if (stdout) gitStatusCallback(stdout)
        })
    }
    async checkFiles(callback) {
        if (this.isGitRepo()) {

            this.gitStatus((gitStatusStdout) => {
                warnLog(`there some ${chalk.underline('untracked & uncommited')} files :`)
                greenLog(gitStatusStdout)

                prompts({
                    type: 'confirm',
                    name: 'value',
                    message: 'r u sure to continue ?',
                    initial: true
                })
                    .then((answer) => {
                        if (answer.value) {
                            callback.call()
                        }
                        else {
                            process.exit();
                        }
                    })
            })


        }


    }
}

// let git = new Git();



module.exports = Git