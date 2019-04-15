const database = require("../common/database");
const q = require("q");

const connection = database.getConnection();

const getAllTypes = () => {
    let defer = q.defer();
    connection.query('SELECT * FROM types',
        (err, result) => {
            if (err) defer.reject(err);
            else {
                //   console.log(sql);
                defer.resolve(result);
            }
        });
    return defer.promise;
}

module.exports = {
    getAllTypes: getAllTypes
}