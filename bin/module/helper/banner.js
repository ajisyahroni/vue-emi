const chalk = require('chalk');
const boxen = require('boxen')
const pjson = require('../../../package.json');

module.exports = function (hint) {

    let text = `______ ${chalk.red(pjson.name)} ______`;
    text += '\n';
    text += chalk.green(pjson.description);
    text += '\n';
    text += 'v' + pjson.version
    let options = {
        borderColor: 'cyan',
        borderStyle: 'round',
        padding: 1,
        margin: 1,
        align: 'center'
    }

    console.log(boxen(text, options))

}

