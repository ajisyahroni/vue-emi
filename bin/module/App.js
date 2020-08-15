const { clgError, clgInfo, clgSuccess } = require('./console');
const { readFile, writeFile, readDir, mkDir, existsSync } = require('./promisify');
const path = require('path');
const prompts = require('prompts');

/**
 * =================================
 * APP CLASS IS A PARENT CLASS
 * handle console, path, prompt terminal, and main io
 * 
 * =================================
 */

class App {
    constructor() {
        // console
        this.error = clgError;
        this.info = clgInfo;
        this.success = clgSuccess;

        // io
        this.readFile = readFile;
        this.writeFile = writeFile;
        this.readDir = readDir;
        this.mkDir = mkDir;
        this.existsSync = existsSync;

        // path
        this.path = path;

        // interactive terminal
        this.prompts = prompts;

    }

    // member function to check existence
    checkExists(path) {
        if (this.existsSync(path)) this.info(`${path} already exists`)
        return this.existsSync(path)
    }
}

module.exports = App;