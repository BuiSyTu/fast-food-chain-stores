const database = require("../common/database");
const q = require("q");

const connection = database.getConnection();

const getAllFoods = () => {
    let defer = q.defer();
    let sql = 'SELECT * FROM foods f, types t WHERE f.t_id = t.t_id';
    connection.query(sql, (err, result) => {
        if (err) defer.reject(err);
        else {
            defer.resolve(result);
        }
    });
    return defer.promise;
}

const getFoodById = id => {
    let defer = q.defer();
    let sql = "SELECT * FROM foods f, types t WHERE f.t_id = t.t_id AND f.f_id = ?";
    connection.query(sql, id, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}


module.exports = {
    getAllFoods: getAllFoods,
    getFoodById: getFoodById
}