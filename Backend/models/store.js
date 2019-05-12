var q = require("q");
var db = require("../common/database");
var conn = db.getConnection();

function getAllStores(){
  var defer = q.defer();

  var query = conn.query('SELECT * FROM stores', function(err, posts){
    if(err){
      defer.reject(err);
    } else{
      defer.resolve(posts);
    }
  });
  return defer.promise;
}

module.exports = {
  getAllStores: getAllStores,
}
