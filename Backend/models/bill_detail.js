const database = require("../common/database");
const q = require("q");

const connection = database.getConnection();

const getAllItemByBillId = bill_id => {
    let defer = q.defer();
    let sql = "SELECT F.f_name, T.t_name, F.f_size, BD.bd_quantity, F.f_price, BD.bd_id FROM bill_detail as BD, foods as F, types as T WHERE (BD.b_id = ? and BD.f_id = F.f_id and F.t_id = T.t_id )";
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

const getBillIdByBDId = bd_id => {
    let defer = q.defer();
    let sql = "SELECT b_id FROM bill_detail WHERE bd_id = ?";
    connection.query(sql, bd_id, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

const deleteItem = id => {
    let defer = q.defer();
    let sql = "DELETE FROM bill_detail WHERE bd_id = ?";
    connection.query(sql, id, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

const updateQuantity = (id, quantity) => {
    let defer = q.defer();
    let sql = "UPDATE bill_detail SET bd_quantity = ? WHERE bd_id = ?";
    connection.query(sql, [quantity, id], (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

const deleteAllItemByBillId = b_id => {
    let defer = q.defer();
    let sql = "DELETE FROM bill_detail WHERE b_id = ?";
    connection.query(sql, b_id, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

const getAllBillByUserId = (userId) => {
    var defer = q.defer();

    connection.query('SELECT * FROM bills, stores, bill_detail, foods, types WHERE bills.s_id = stores.s_id AND bill_detail.f_id=foods.f_id AND bills.b_id=bill_detail.b_id AND foods.t_id=types.t_id AND customer_id = ? ORDER BY bills.b_created_at DESC', [userId], function (err, bills) {
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
    updateQuantity: updateQuantity,
    deleteAllItemByBillId: deleteAllItemByBillId,
    getAllBillByUserId: getAllBillByUserId,
    getBillIdByBDId: getBillIdByBDId
}
