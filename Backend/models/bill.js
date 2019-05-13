const database = require("../common/database");
const q = require("q");

const connection = database.getConnection();

const getAllBills = () => {
    let defer = q.defer();
    let sql = "SELECT * FROM bills AS B, accounts AS A WHERE B.customer_id = A.a_id ORDER BY B.b_id DESC";
    connection.query(sql, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

const getBillById = id => {
    let defer = q.defer();
    let sql = "SELECT * FROM bills AS B, accounts AS A WHERE (B.b_id = ? and B.customer_id = A.a_id)";
    connection.query(sql, id, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

const addBill = bill => {
    let defer = q.defer();
    let sql = "INSERT INTO bills SET ?";
    connection.query(sql, bill, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

const deleteBill = b_id => {
    let defer = q.defer();
    let sql = "DELETE FROM bills WHERE b_id = ? ";
    connection.query(sql, b_id, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

const updateBill = (b_id, new_bill) => {
    let defer = q.defer();
    let sql = "UPDATE bills SET b_status = ?, b_hour, b_day_of_week, b_payment_method WHERE b_id = ?";
    connection.query(sql, [new_bill.b_status, new_bill.b_hour, new_bill.b_day_of_week, new_bill.b_payment_method, b_id], (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

const updateBillStatus = (b_id, b_status) => {

    var defer = q.defer();
    connection.query('UPDATE bills SET b_status = ? WHERE b_id = ?', [b_status, b_id], (err, result) => {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });
    return defer.promise;
}
module.exports = {
    getAllBills: getAllBills,
    getBillById: getBillById,
    addBill: addBill,
    deleteBill: deleteBill,
    updateBill: updateBill,
    updateBillStatus: updateBillStatus
}
