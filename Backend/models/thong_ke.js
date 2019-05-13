var q = require('q');
var db = require('../common/database');
var conn = db.getConnection();
const dateDate_md = require('../common/dateData');
var food_md = require('./food');
var today = new Date();
var dataThongKe = {
    allBillEachDay: {
        day: '',
        quantity: ''
    }
};
// dataThongKe.allBillEachDay = {};
var dateFormat = require('dateformat');


function countFavouriteFoodWithFoodId() {
    let defer = q.defer();
    let sql = "SELECT f_name name, COUNT(f_id) as count FROM favourites NATURAL JOIN foods  GROUP BY f_name ";
    conn.query(sql, (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });

    return defer.promise;
}


function getAllBillInWeek(yearNow, weekNow) {
    let defer = q.defer();
    let sql = "SELECT COUNT(b_id) as count FROM bills WHERE b_year = " + yearNow + " AND b_week_of_year = " + weekNow;
    conn.query(sql, (err, result) => {
        if (err) {
            defer.reject(err);
            console.log(sql);
        } else defer.resolve(result);
    });

    return defer.promise;
}

function getAllBillInMonth(yearNow, monthNow) {
    let defer = q.defer();
    let sql = "SELECT COUNT(b_id) as count FROM bills WHERE b_year = " + yearNow + " AND b_month_of_year = " + monthNow;
    conn.query(sql, (err, result) => {
        if (err) {
            defer.reject(err);
            console.log(sql);
        } else defer.resolve(result);
    });

    return defer.promise;
}

function getAllProductInDay(dayNow) {
    let defer = q.defer();
    let sql = "SELECT SUM(bd_quantity) quantity FROM bills NATURAL JOIN bill_detail where b_created_at >= " + "'" + dayNow + "'";
    conn.query(sql, (err, result) => {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result)
        };
    });
    return defer.promise;
}

function getDataThongKe() {
    let weekOfYear = dateDate_md.getWeekOfYear();
    getAllBillInWeek(today.getFullYear(), weekOfYear)
        .then(result => {
            result = JSON.parse(JSON.stringify(result))[0];
            (result.count != null) ? dataThongKe.allBillInWeek = result.count: dataThongKe.allBillInWeek = 0;
            return getAllBillInMonth(today.getFullYear(), today.getMonth() + 1);
        })
        .then(result => {
            result = JSON.parse(JSON.stringify(result))[0];
            (result.count != null) ? dataThongKe.allBillInMonth = result.count: dataThongKe.allBillInMonth = 0;
            return getAllProductInDay(dateFormat(today, "yyyy-mm-dd"));
        }).then(result => {
            result = JSON.parse(JSON.stringify(result))[0];
            (result.quantity != null) ? dataThongKe.allProductInDay = result.quantity: dataThongKe.allProductInDay = 0;
        }).catch(err => {
            console.log(err);
        });
    return dataThongKe;
}

function getAllBillEachDay(start, end) {
    let defer = q.defer();
    let sql = "SELECT SUM(bd_quantity) quantity FROM bills NATURAL JOIN bill_detail where b_created_at >= '" + start + "' AND b_created_at < '" + end + "'";
    conn.query(sql, (err, result) => {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result)
            console.log(sql);
        };
    });
    return defer.promise;
}

function getDataQuantityBillEachDay(startDate, nextDate) {
    let startDateString;
    let nextDateString;
    // let startDate = dateDate_md.getDateWeekAgo().dateStartWeekAgo;
    // let nextDate = dateDate_md.getDateWeekAgo().nextDate;

    startDateString = dateFormat(startDate, 'yyyy-mm-dd');
    nextDateString = dateFormat(nextDate, 'yyyy-mm-dd');
    getAllBillEachDay(startDateString, nextDateString)
        .then(result => {
            result = JSON.parse(JSON.stringify(result))[0];
            // (result.quantity != null) ? dataThongKe.allBillEachDay.quantity = result.quantity: dataThongKe.allBillEachDay.quantity = 0;
            (result.quantity != null) ? dataThongKe.allBillEachDay.quantity = result.quantity: dataThongKe.allBillEachDay.quantity = 0;
            switch (startDate.getDay()) {
                case 0:
                    // dataThongKe.allBillEachDay.day = "Chủ nhật";
                    dataThongKe.allBillEachDay.day = "Chủ nhật";
                    break;
                case 1:
                    dataThongKe.allBillEachDay.day = "Thứ 2";
                    break;
                case 2:
                    dataThongKe.allBillEachDay.day = "Thứ 3";
                    break;
                case 3:
                    dataThongKe.allBillEachDay.day = "Thứ 4";
                    break;
                case 4:
                    dataThongKe.allBillEachDay.day = "Thứ 5";
                    break;
                case 5:
                    dataThongKe.allBillEachDay.day = "Thứ 6";
                    break;
                case 6:
                    dataThongKe.allBillEachDay.day = "Thứ 7";
                    break;

                default:
                    break;
            }

        }).catch(err => {
            console.log(err);
        });
    // startDate.setDate(startDate.getDate() + 1);
    // nextDate.setDate(nextDate.getDate() + 1);
    return dataThongKe;
}

function getDoanhThuTheoThang(month, year) {
    let startDate = year + "-" + month + "-" + "01";
    let endDate = year + "-" + month + "-" + "31";

    let defer = q.defer();
    let sql = "SELECT SUM(bd_id * f_price) doanhthu FROM bills b, bill_detail bd, foods f where b.b_created_at >= '" + startDate + "' and b_created_at <= '" + endDate + "' and b.b_id = bd.b_id and bd.f_id = f.f_id";
    conn.query(sql, (err, result) => {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result)
            console.log(sql);
        };
    });
    return defer.promise;
}
module.exports = {
    countFavouriteFoodWithFoodId: countFavouriteFoodWithFoodId,
    getAllBillInWeek: getAllBillInWeek,
    getAllBillInMonth: getAllBillInMonth,
    getDataThongKe: getDataThongKe,
    getAllProductInDay: getAllProductInDay,
    getAllBillEachDay: getAllBillEachDay,
    getDataQuantityBillEachDay: getDataQuantityBillEachDay,
    getDoanhThuTheoThang: getDoanhThuTheoThang
}