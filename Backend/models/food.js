var q = require("q");
var db = require("../common/database");
var conn = db.getConnection();

function getAllFoods(){
  var defer = q.defer();

  var query = conn.query('SELECT f_id, t_name, f_price, f_name, f_size, f_url FROM foods INNER JOIN types ON foods.t_id=types.t_id', function(err, foodsData){
    if(err){
      defer.reject(err);
    } else{
      var foods = [];
      for(var i = 0; i < foodsData.length; i++){
        var indexOfFood = -1;
        for(var j = 0; j < foods.length; j ++){
          if (foodsData[i].f_name == foods[j].f_name) {
            indexOfFood = j;
            break;
          }
        }

        if (indexOfFood == -1){
           var data = {
             f_id: foodsData[i].f_id,
             f_name: foodsData[i].f_name,
             f_price: foodsData[i].f_price,
             f_url: foodsData[i].f_url,
             t_name: new Set([foodsData[i].t_name]),
             f_size: new Set([foodsData[i].f_size])
           }
          foods.push(data);
        } else {
          foods[indexOfFood].t_name.add(foodsData[i].t_name);
          foods[indexOfFood].f_size.add(foodsData[i].f_size);
        }
      }
      defer.resolve(foods);
    }
  });
  return defer.promise;
}

function getFoodsBy(name, type, size){
  var defer = q.defer();
  var query = conn.query('SELECT * FROM foods INNER JOIN types ON foods.t_id=types.t_id WHERE f_name=? AND t_name=? AND f_size=?',[name, type, size], function(err, foods){
    if(err){
      defer.reject(err);
    } else{
      defer.resolve(foods);
    }
  });
  return defer.promise;
}

module.exports = {
  getAllFoods: getAllFoods,
  getFoodsBy: getFoodsBy
}
