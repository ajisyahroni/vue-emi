const chalk = require('chalk');
const boxen = require('boxen')


module.exports = function (hint) {

    let text = `______ ${chalk.red('EMI')} ______`;
    text += '\n';
    text += chalk.green("VUE Project Asisstant");
    text += '\n';
    text += "v.1.0.0"
    let options = {
        borderColor: 'cyan',
        borderStyle: 'round',
        padding: 1,
        margin: 1,
        align: 'center'
    }

    console.log(boxen(text, options))

}

