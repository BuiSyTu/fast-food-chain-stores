const database = require("../common/database");
const q = require("q");

const connection = database.getConnection();

const getAllUsers = () => {
    let defer = q.defer();
    connection.query('SELECT * FROM accounts',
        (err, result) => {
            if (err) defer.reject(err);
            else {
                //   console.log(sql);
                defer.resolve(result);
            }
        });
    return defer.promise;
}

const getUserById = id => {
    let defer = q.defer();
    connection.query(
        "SELECT * FROM accounts WHERE a_id = ?",
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

const addUser = user => {
    let defer = q.defer();
    connection.query(
        "INSERT INTO accounts SET ?",
        user,
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

const deleteUser = id => {
    let defer = q.defer();
    connection.query(
        "DELETE FROM accounts WHERE a_id = ?",
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

const getUserByUsername = username => {
    let defer = q.defer();
    let sql = "SELECT * FROM accounts WHERE a_username = ?";

    connection.query(sql, username, (err, result) => {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });
    return defer.promise;
}

const getTotalUser = () => {
    let defer = q.defer();
    let sql = "SELECT COUNT(a_id) as totalUser FROM accounts";
    connection.query(sql, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
};

const getMaxUserId = () => {
    let defer = q.defer();
    // lấy id max dưới dạng number
    let sql =
        "SELECT MAX(CAST(a_id AS UNSIGNED)) AS ID_MAX FROM accounts";
    connection.query(sql, (err, result) => {
        if (err) {
            defer.reject(err);
        } else defer.resolve(result);
    });
    return defer.promise;
};
module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    addUser: addUser,
    deleteUser: deleteUser,
    getUserByUsername: getUserByUsername,
    getTotalUser: getTotalUser,
    getMaxUserId: getMaxUserId
}