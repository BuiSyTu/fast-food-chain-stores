var q = require("q");
var db = require("../common/database");
var conn = db.getConnection();

function getAllFavoriteFoodByUserId(userId){
  var defer = q.defer();

  var query = conn.query('SELECT foods.f_id, f_name, f_price, a_id, fv_id, f_url FROM favourites INNER JOIN foods ON foods.f_id=favourites.f_id WHERE ?', {a_id: userId}, function(err, favorites){
    if(err){
      defer.reject(err);
    } else{
      defer.resolve(favorites);
    }
  });
  return defer.promise;
}

function addFavorite(params){
  if(params){
    var defer = q.defer();
    var query = conn.query('INSERT INTO favourites SET ?', params, function (err, result) {
      if (err) {
        defer.reject(err);
      } else{
        defer.resolve(result);
      }
    });

    return defer.promise;
  }

  return false;
}

function deleteFavorite(f_id, a_id){
  if (f_id){
    var defer = q.defer();

    var query = conn.query('DELETE FROM favourites WHERE f_id = ? AND a_id=?', [f_id, a_id], function(err, result){
      if(err){
        defer.reject(err);
      } else{
        defer.resolve(result);
      }
    });
    return defer.promise;
  } else {
    return false;
  }
}

module.exports = {
  getAllFavoriteFoodByUserId: getAllFavoriteFoodByUserId,
  addFavorite: addFavorite,
  deleteFavorite: deleteFavorite

}
