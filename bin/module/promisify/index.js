const fs = require("fs");
const util = require("util");
/**
 * ===========================
 * PROMISIFY FS
 * ===========================
 */
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readDir = util.promisify(fs.readdir);
const mkDir = util.promisify(fs.mkdir);
const existsSync = fs.existsSync
/**
 * END PROMISIFY
 */

module.exports = { readFile, writeFile, readDir, mkDir, existsSync }