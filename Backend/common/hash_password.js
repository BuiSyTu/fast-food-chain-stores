const bcrypt = require('bcrypt');
const saltRounds = 10;


function hashPasword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function comparePassword(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword);
}
module.exports = {
    hashPassword: hashPasword,
    comparePassword: comparePassword
}