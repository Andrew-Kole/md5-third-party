const md5 = require('crypto-js/md5');
const FileReader = require('./file-reader');

/**
 * class that encrypts content of the textFile
 * @class
 */
class ContentEncryptor{

    /**
     * encrypts file's content
     * @method
     * @returns promise
     */
    async encryptFileContent(filepath){
        try{
            const reader = new FileReader();
            const originalContent = await reader.readFile(filepath);
            return md5(originalContent).toString();
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * encrypts message provided to terminal
     * @param {string} message
     * @returns string
     */
    encryptMessage(message) {
        return md5(message).toString();
    }
}

module.exports = ContentEncryptor;
