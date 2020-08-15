const { infoBox, chalk, boxen } = require("./config")

const clgInfo = (msg = "") => {
    let templateMsg = chalk.white.bold(msg);
    let msgBox = boxen(templateMsg, infoBox);
    console.log(msgBox);
}
module.exports = { clgInfo }