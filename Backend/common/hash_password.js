const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = password => bcrypt.hashSync(password, saltRounds);

const comparePassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

module.exports = { hashPassword, comparePassword }
