const { successBox, chalk, boxen } = require("./config")

const clgSuccess = (msg = "") => {
    let templateMsg = chalk.white.bold(msg);
    let msgBox = boxen(templateMsg, successBox);
    console.log(msgBox);
}
module.exports = { clgSuccess }