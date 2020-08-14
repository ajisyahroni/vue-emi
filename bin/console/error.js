const { errorBox, chalk, boxen } = require("./config")

const clgError = (msg = "") => {
    let templateMsg = chalk.white.bold(msg);
    let msgBox = boxen(templateMsg, errorBox);
    console.log(msgBox);
}
module.exports = { clgError }