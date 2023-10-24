/**
 * Unsupported file extension exception
 * @class
 */
class UnsupportedExtError extends Error{
    /**
     * This custom exceptions handler takes file-extension as argument
     * @param {string} extension - extension of the file
     */
    constructor(extension) {
        super(`Extension ${extension} is not supported`);
        this.name = 'UnsupportedExtError'
    }
}

/**
 * Custom exceptions handler for not found file.
 * @class
 */
class FileNotFoundError extends Error{
    /**
     * This custom errors handler takes filepath as argument
     * @constructor
     * @param {string} filepath - filepath to the file
     */
    constructor(filepath) {
        super(`File not found at the path: ${filepath}`);
        this.name = 'FileNotFoundError';
    }
}

module.exports = {UnsupportedExtError, FileNotFoundError};
