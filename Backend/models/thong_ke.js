var q = require('q');
var db = require('../common/database');
var conn = db.getConnection();

var food_md = require('./food');

function countFavouriteFoodWithFoodId() {
    var defer = q.defer();
    var sql = "SELECT COUNT(f_id) as count, f_id FROM favourites GROUP BY f_id";
    conn.query(sql, (err, result)=>{
        if(err) defer.reject(err);
        else defer.resolve(result);
    });

    return defer.promise;
}



module.exports ={
    countFavouriteFoodWithFoodId: countFavouriteFoodWithFoodId
}