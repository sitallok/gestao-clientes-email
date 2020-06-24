class Crypter {
    enconde64(value) {
        let buff = new Buffer(value);
        return buff.toString('base64');
    }
    decode64(value) {
        let buff = new Buffer(value, 'base64');
        return buff.toString('ascii');
    }
}

module.exports = new Crypter();