// main dependency
const chalk = require("chalk");
const boxen = require("boxen");
// end import
const boxenFactory = (color) => {
    return {
        align:'center',
        borderStyle: "round",
        borderColor: color,
    }
}
const successBox = boxenFactory("green");
const errorBox = boxenFactory("red");
const infoBox = boxenFactory("blue");

module.exports = { chalk, boxen, successBox, errorBox, infoBox }