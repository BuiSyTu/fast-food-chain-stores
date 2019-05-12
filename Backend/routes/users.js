var express = require('express');
var router = express.Router();
var store_md = require('../models/store');
var food_md = require('../models/food');
var favoriteFood_md = require('../models/favourites');
var bill_md = require('../models/bill');
var billDetail_md = require('../models/bill_detail');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("user/start");
});

router.get('/selectShop', function(req, res, next) {
  var data = store_md.getAllStores();
  data.then(function(stores){
    var data = {
      stores: stores,
      error: false
    }
    res.render("user/selectShop", {data: data});
  }).catch(function(err){
    res.render("user/selectShop", {data: {error: err}});
  });
});

router.get('/placeOrder/:storeId', function(req, res, next) {
  var query = req.query;

  var params = req.params;
  var storeId = params.storeId;
  var data = food_md.getAllFoods();
  data.then(function(foods){
    favoriteFood_md.getAllFavoriteFoodByUserId(1).then(function(favoriteFood){

      var favorites = [];
      for (var i = 0; i < foods.length; i++) {
        favorites[i]=0;
        for (var j = 0; j < favoriteFood.length; j++) {
          if (foods[i].f_id==favoriteFood[j].f_id){
            favorites[i]=1;
          }
        }
      }

      var data = {
        query: query,
        foods: foods,
        favorites: favorites,
        storeId: storeId,
        error: false
      }
      res.render("user/PlaceOrder", {data: data});
    });
  }).catch(function(err){
    res.render("user/PlaceOrder", {data: {error: err}});
  });
});

router.get('/favoriteFood', function(req, res, next) {
  var data = favoriteFood_md.getAllFavoriteFoodByUserId(1);
  data.then(function(favoriteFood){
    var data = {
      favoriteFood: favoriteFood,
      error: false
    }
    res.render("user/FavoriteFood", {data: data});
  }).catch(function(err){
    res.render("user/FavoriteFood", {data: {error: err}});
  });
});
router.delete("/favoriteFood", function(req,res){
  var f_id = req.body.id;
  var data = favoriteFood_md.deleteFavorite(f_id, 1);


  data.then(function(result){
    res.json({status_code: 200});
  }).catch(function(err){
    res.json({status_code: 500});
  });

});

router.put("/favoriteFood", function(req, res){
  var params = req.body;
  params.a_id = 1;

  data = favoriteFood_md.addFavorite(params);

  data.then(function(result){
    res.json({status_code: 200});
  }).catch(function(err){
    res.json({status_code: 500});
  });

});

router.put("/placeOrder", function(req, res){
  var params = req.body;
  data = food_md.getFoodsBy(params.name, params.type, params.size);

  data.then(function(result){
    res.json({status_code: 200, data: result[0]});
  }).catch(function(err){
    res.json({status_code: 500});
  });
});

router.get('/payment', function(req, res, next) {
  var params = req.query;
  res.render("user/Payment",{data: params});
});

router.post("/payment", function(req, res){
var params = JSON.parse(req.body.json);
  var today = new Date();
  weekNumber = today.getWeek();
  var bill = {};
  bill.customer_id = 1;
  bill.s_id = params.storeId;
  bill.b_created_at = new Date();
  bill.b_status = params.paymentMethod;
  bill.b_hour = bill.b_created_at.getHours();
  bill.b_day_of_week = bill.b_created_at.getDay();
  bill.b_week_of_year = weekNumber;
  bill.b_month_of_year = bill.b_created_at.getMonth()+1;
  bill.b_year = today.getFullYear();
  bill.b_payment_method = params.paymentMethod;

  data = bill_md.addBill(bill);
  data.then(function(result){
    for (var i = 0; i < params.foodIds.length; i++) {
      var billDetail = {
        b_id: result.insertId,
        f_id: params.foodIds[i],
        bd_quantity: params.qtys[i]
      }
      billDetail_md.addItem(billDetail);
    }
    res.json({status_code: 200});
  }).catch(function(err){
    res.json({status_code: 500});
  });
});

router.get('/submitSuccess', function(req, res, next) {
  res.render("user/SubmitSuccess");
});
router.get('/previousOrder', function(req, res, next) {
  data = billDetail_md.getAllBillByUserId(1);
  data.then(function(billDetailData){
    var billDetails = [];
    for(var i = 0; i < billDetailData.length; i++){
      var indexOfBillDetail = -1;
      for(var j = 0; j < billDetails.length; j ++){
        if (billDetailData[i].b_id == billDetails[j].b_id) {
          indexOfBillDetail = j;
          break;
        }
      }

      if (indexOfBillDetail == -1){
         var dataBill = {
           b_id: billDetailData[i].b_id,
           b_created_at: billDetailData[i].b_created_at,
           b_status: billDetailData[i].b_status,
           b_day_of_week: billDetailData[i].b_day_of_week,
           b_payment_method: billDetailData[i].b_payment_method,
           s_name: billDetailData[i].s_name,
           s_address: billDetailData[i].s_address,
           billDetail: new Array({
             t_name: billDetailData[i].t_name,
             bd_quantity: billDetailData[i].bd_quantity,
             f_price: billDetailData[i].f_price,
             f_name: billDetailData[i].f_name,
             f_size: billDetailData[i].f_size
           })
         }
        billDetails.push(dataBill);
      } else {
        billDetails[indexOfBillDetail].billDetail.push({
          t_name: billDetailData[i].t_name,
          bd_quantity: billDetailData[i].bd_quantity,
          f_price: billDetailData[i].f_price,
          f_name: billDetailData[i].f_name,
          f_size: billDetailData[i].f_size
        });
      }
    }
    var data = {
      billDetails: billDetails,
      error: false
    }
    res.render("user/PreviousOrder", {data: data});
  }).catch(function(err){
    res.render("user/PreviousOrder", {data: {error: err}});
  });
});

router.put("/previousOrder", function(req, res){
  var params = req.body;
  params.b_status = 2;
  //console.log(params);
  data = bill_md.updateStatusBill(params);

  data.then(function(result){
    res.json({status_code: 200});
  }).catch(function(err){
    res.json({status_code: 500});
  });
});

Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

module.exports = router;
