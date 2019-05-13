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

const addFood = food => {
    let defer = q.defer();
    connection.query(
        "INSERT INTO foods SET ?",
        food,
        (err, rows) => {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(rows);
            }
        }
    );
    return defer.promise;
}

const deleteFood = id => {
    let defer = q.defer();
    connection.query(
        "DELETE FROM foods WHERE f_id = ?",
        id,
        (err, rows) => {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(rows);
            }
        }
    );
    return defer.promise;
}

const updateFood = food => {
    let defer = q.defer();
    connection.query(
        "UPDATE foods SET t_id = ?, f_name =?, f_size = ?, f_url = ?, f_price = ? WHERE f_id = ?",
        [food.t_id, food.f_name, food.f_size, food.f_url, food.f_price, food.f_id],
        (err, rows) => {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(rows);
            }
        }
    );
    return defer.promise;
}


module.exports = {
    getAllFoods: getAllFoods,
    getFoodById: getFoodById,
    addFood: addFood,
    deleteFood: deleteFood,
    updateFood: updateFood
}