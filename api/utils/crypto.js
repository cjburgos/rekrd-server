const crypto = require('crypto');

function hashFile(file){
    let hash = crypto.createHash('sha256');
    let hashedFile = hash.update(file.buffer);
    return hashedFile.digest('hex')
}

module.exports = {
    hashFile
}