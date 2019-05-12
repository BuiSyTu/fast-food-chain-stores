const database = require("../common/database");
const q = require("q");

const connection = database.getConnection();

const getAllBills = () => {
    let defer = q.defer();
    let sql = 'SELECT * FROM bills b, bill_detail bd WHERE b.b_id = bd.b_id';
    connection.query(sql, (err, result) => {
        if (err) defer.reject(err);
        else {
            defer.resolve(result);
        }
    });
    return defer.promise;
}

const getBillById = id => {
    let defer = q.defer();
    let sql = "SELECT * FROM bills b, bill_detail bd WHERE b.b_id = ? AND b.b_id = bd.b_id";
    connection.query(sql, id, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

module.exports = {
    getAllBills: getAllBills,
    getBillById: getBillById
}