const database = require("../common/database");
const q = require("q");

const connection = database.getConnection();

const getAllBills = () => {
    let defer = q.defer();
    connection.query('SELECT * FROM bills', (err, result) => {
        if (err) defer.reject(err);
        else {
            defer.resolve(result);
        }
    });
    return defer.promise;
}

const getBillById = id => {
    let defer = q.defer();
    connection.query("SELECT * FROM bills WHERE b_id = ?", id, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

module.exports = {
    getAllBills: getAllBills,
    getBillById: getBillById
}