const database = require("../common/database");
const q = require("q");

const connection = database.getConnection();

const getAllItemByBillId = bill_id => {
    let defer = q.defer();
    let sql = "SELECT f_id, bd_quantity FROM bill_detail WHERE b_id = ?";
    connection.query(sql, bill_id, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

const addItem = item => {
    let defer = q.defer();
    let sql = "INSERT INTO bill_detail SET ?";
    connection.query(sql, item, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

const deleteItem = item => {
    let defer = q.defer();
    let sql = "DELETE FROM bill_detail WHERE (b_id = ?) and (f_id = ?)";
    connection.query(sql, [item.b_id, item.f_id], (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

const increaseQuantity = item => {
    let defer = q.defer();
    let count = item.bd_quantity;
    let sql = "UPDATE bill_detail SET bd_quantity = ?";
    connection.query(sql, count++, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

const decreaseQuantity = item => {
    let count = item.bd_quantity;
    if (count > 1) {
        let defer = q.defer();
        let sql = "UPDATE bill_detail SET bd_quantity = ?";
        connection.query(sql, count--, (err, result) => {
            if (err) defer.reject(err);
            else defer.resolve(result);
        });
        return defer.promise;
    } else {
        console.log("Khong the giam them !");
    }
}

const deleteAllItemByBillId = b_id => {
    let count = item.bd_quantity;
    let defer = q.defer();
    let sql = "DELETE FROM bill_detail WHERE b_id = ?";
    connection.query(sql, b_id, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

function getAllBillByUserId(userId) {
    var defer = q.defer();

    var query = connection.query('SELECT * FROM bills, stores, bill_detail, foods, types WHERE bills.s_id = stores.s_id AND bill_detail.f_id=foods.f_id AND bills.b_id=bill_detail.b_id AND foods.t_id=types.t_id AND customer_id = ? ORDER BY bills.b_created_at DESC', [userId], function (err, bills) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(bills);
        }
    });
    return defer.promise;
}

module.exports = {
    getAllItemByBillId: getAllItemByBillId,
    addItem: addItem,
    deleteItem: deleteItem,
    increaseQuantity: increaseQuantity,
    decreaseQuantity: decreaseQuantity,
    deleteAllItemByBillId: deleteAllItemByBillId,
    getAllBillByUserId: getAllBillByUserId
}
