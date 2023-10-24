const ContentEncryptor = require('./encryptor');


if(process.argv.length < 4){
    console.error("You have to provide mode 'file' or 'message' and then path to file in case of file mode or message in case of message mode");
    process.exit(1);
}
const mode = process.argv[2];
const input = process.argv[3];

if (!mode || !input){
    console.error('Provide MODE= and INPUT=');
    process.exit(1);
}

/**
 * Usage: you have to provide to terminal node ./index.js and then the filepath
 * For example: node ./index.js ./textFiles/data.txt
 * @param {string} mode - chosen mode 'file' or 'message'
 * @param {string} input - filepath or message depending of mode
 * @returns {Promise<void>}
 */
async function encryptData(mode, input) {
    const encryptor = new ContentEncryptor();

    try{
        if(mode === 'file'){
            const encryptedData = await encryptor.encryptFileContent(input);
            console.log('Encrypted data: ',encryptedData);
        }
        else if(mode === 'message') {
            const encryptedData = encryptor.encryptMessage(input);
            console.log('Encrypted data: ', encryptedData);
        }
        else {
            console.error('Invalid mode. Choose file or message.')
        }
    }
    catch (error) {
        console.error('Encryption failed: ', error.message);
    }
}

console.log('Hello! Wait, please, while your request is processing.')

const waitTime = 10000;
const startTime = Date.now();

const earlyInterruptionHandler = () => {
    const timePassed = (Date.now() - startTime) / 1000;
    console.log(`Stopped by user after ${timePassed} seconds.`);
    process.exit(0);
}

setTimeout(() => {
    encryptData(mode, input);
}, waitTime);

process.on('SIGINT', earlyInterruptionHandler);
process.on('SIGTERM', earlyInterruptionHandler);

