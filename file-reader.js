const fs = require('node:fs').promises;
const path = require('node:path');
const CustomError = require('./errors')


/**
 * This class opens text files. Supported files has extentions .txt, .doc, .docx
 * @class
 */
class FileReader{
    /**
     * class instance creats with build-in supported extentions
     * @constructor
     */
    constructor(){
        this.allowedExtensions = ['.txt', '.doc', '.docx'];
    }

    /**
     * reads file and checks its extension
     * @param {string} filepath - filepath to your text file with supported extension
     * @returns {Promise<string>} - returns content of the file
     */
    async readFile(filepath){
        try {
            const fileExtension = path.extname(filepath).toLowerCase();
            if(!this.allowedExtensions.includes(fileExtension)){
                throw new CustomError.UnsupportedExtError(fileExtension);
            }
            return await fs.readFile(filepath, 'utf-8');
        }
        catch (error) {
            if(error.code === 'ENOENT'){
                throw new CustomError.FileNotFoundError(filepath);
            }
            else if(error instanceof CustomError.UnsupportedExtError){
                throw error;
            }
            else {
                console.error('Failed file reading: ', error.message);
                process.exit(1);
            }
        }
    }
}

module.exports = FileReader;
