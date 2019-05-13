var q = require('q');
var db = require('../common/database');
var conn = db.getConnection();
const dateDate_md = require('../common/dateData');
var food_md = require('./food');
var today = new Date();
var dataThongKe={};

function countFavouriteFoodWithFoodId() {
    var defer = q.defer();
    var sql = "SELECT f_name name, COUNT(f_id) as count FROM favourites NATURAL JOIN foods  GROUP BY f_name ";
    conn.query(sql, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });

    return defer.promise;
}


function getAllBillInWeek(yearNow, weekNow) {
    var defer = q.defer();
    var sql = "SELECT COUNT(b_id) as count FROM bills WHERE b_year = " + yearNow + " AND b_week_of_year = " + weekNow;
    conn.query(sql, (err, result) => {
        if (err) {
            defer.reject(err);
            console.log(sql);
        } else defer.resolve(result);
    });

    return defer.promise;
}

function getAllBillInMonth(yearNow, monthNow) {
    var defer = q.defer();
    var sql = "SELECT COUNT(b_id) as count FROM bills WHERE b_year = " + yearNow + " AND b_month_of_year = " + monthNow;
    conn.query(sql, (err, result) => {
        if (err) {
            defer.reject(err);
            console.log(sql);
        } else defer.resolve(result);
    });

    return defer.promise;
}

// function getAllProductInDay(dayNow, )

function getDataThongKe() {
    let weekOfYear = dateDate_md.getWeekOfYear();
    getAllBillInWeek(today.getFullYear(), weekOfYear)
        .then(result => {
            result = JSON.parse(JSON.stringify(result))[0];
            dataThongKe.allBillInWeek = result.count;
            return getAllBillInMonth(today.getFullYear(), today.getMonth() + 1);
        })
        .then(result => {
            result = result[0];
            dataThongKe.allBillInMonth = result.count;
            // console.log(dataThongKe);
        }).catch(err => {
            console.log(err);
        });
        return dataThongKe;
}

module.exports = {
    countFavouriteFoodWithFoodId: countFavouriteFoodWithFoodId,
    getAllBillInWeek: getAllBillInWeek,
    getAllBillInMonth: getAllBillInMonth,
    getDataThongKe: getDataThongKe
}