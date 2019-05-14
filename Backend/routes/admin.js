var express = require('express');
var router = express.Router();
const user_md = require('../models/user');
const bill_md = require('../models/bill');
const food_md = require('../models/foods');
const thong_ke_md = require('../models/thong_ke');
const checkRole = require('../middleware/checkRole');
const dateDate_md = require('../common/dateData');
const dateFormat = require('dateformat');
var today = new Date();

var date = {
    day: dateFormat(today, "yyyy-mm-dd"),
    month: "Tháng " + (today.getMonth() + 1) + " Năm " + (today.getFullYear()),
    week: "Tuần " + dateDate_md.getWeekOfYear() + " Năm " + (today.getFullYear())
};

/* GET home page. */
router.get('/allusers', [checkRole.checkAdminRole], function (req, res, next) {
    let data = {};
    user_md.getAllUsers()
        .then(users => {
            data = users;
            // res.json({
            //     data: data
            // })
            res.render("admin/allusers", {
                data: data
            });
            console.log(data);
        })
});

router.get('/user/:id', [checkRole.checkAdminRole], function (req, res, next) {
    let id = req.params.id;

    user_md.getUserById(id)
        .then(users => {
            data = users[0];
            res.render("admin/user", {
                data: data
            });
            // res.json({
            //     data: data
            // })
        })
})

router.get('role/:id', [checkRole.checkAdminRole], function (req, res, next) {
    let id = req.params.id;

    user_md.getRoleById(id)
        .then(users => {
            data.role = users[0];
            res.json({
                data: data
            })
        })
})


// Hoa don

// tat ca hoa don
router.get('/allbills', [checkRole.checkAdminRole], (req, res, next) => {
    bill_md.getAllBills()
        .then(bills => {
            res.json({
                data: bills
            });
        })
})


// hoa don theo ma hoa don : b_id
router.get('/bill/:id', [checkRole.checkAdminRole], (req, res, next) => {
    let id = req.params.id;
    let data = {};
    bill_md.getBillById(id)
        .then(bills => {
            data = bills[0];
            res.json({
                data: data
            });
        })
})

//get all foods
router.get('/allfoods', [checkRole.checkAdminRole], (req, res, next) => {
    let data = {};
    food_md.getAllFoods()
        .then(foods => {
            data = foods;
            // res.json({
            //     data: data
            // })
            res.render("admin/allfoods", {
                data: foods
            });
            console.log(data);
        })
})

//get food by id: 
router.get('/food/:id', [checkRole.checkAdminRole], (req, res, next) => {
    let id = req.params.id;
    let data = {};

    food_md.getFoodById(id)
        .then(foods => {
            data = foods[0];
            // res.json({
            //     data: data
            // });
            res.render("admin/food", {
                data: data
            });
            console.log(data);
        })
})


router.get('/', [checkRole.checkAdminRole], function (req, res, next) {
    // let weekOfYear = dateDate_md.getWeekOfYear();
    // thong_ke_md.getAllBillInWeek(today.getFullYear(), weekOfYear)
    //     .then(result => {
    //         result = JSON.parse(JSON.stringify(result))[0];
    //         (result.count != null) ? dataThongKe.allBillInWeek = result.count: dataThongKe.allBillInWeek = 0;
    //         return thong_ke_md.getAllBillInMonth(today.getFullYear(), today.getMonth() + 1);
    //     })
    //     .then(result => {
    //         result = JSON.parse(JSON.stringify(result))[0];
    //         (result.count != null) ? dataThongKe.allBillInMonth = result.count: dataThongKe.allBillInMonth = 0;
    //         return thong_ke_md.getAllProductInDay(dateFormat(today, "yyyy-mm-dd"));
    //     }).then(result=>{
    //         result = JSON.parse(JSON.stringify(result))[0];
    //         (result.quantity != null) ? dataThongKe.allProductInDay = result.quantity: dataThongKe.allProductInDay = 0;
    //     }).catch(err => {
    //         console.log(err);
    //     });
    dataThongKe = thong_ke_md.getDataThongKe();
    let data2 = thong_ke_md.dataDoanhThuTheoThang(today.getFullYear());
    res.render("admin/index", {
        dataThongKe,
        date,
        data2
    });
})

// test gg chart
router.get('/favouritefoods', [checkRole.checkAdminRole], (req, res) => {
    thong_ke_md.countFavouriteFoodWithFoodId()
        .then(result => {
            let FavouriteFoods = Object.keys(result).map(key => [result[key].name, result[key].count]);
            // console.log(FavouriteFoods);
            // let FavouriteFoods = [];
            // for(var i = 0; i< result.length; i++){
            //     FavouriteFoods.push([result[i].name, result[i].count]);

            // }
            // var resultJson = JSON.stringify(result);
            // var FavouriteFoods = JSON.stringify(resultArray); 
            res.render("admin/favourtitefoodschart", {
                FavouriteFoods
            });
        }).catch(err => {
            console.log(err);
        })
})
// router.get('/allbillsinweek', (req, res) => {
//     let weekOfYear = dateDate_md.getWeekOfYear();
//     thong_ke_md.getAllBillInWeek(today.getFullYear(), weekOfYear)
//         .then(result => {
//             res.json({data: result});
//         }).catch(err => {
//             console.log(err);
//         })
// })
// router.get('/allbillsinmonth', (req, res) => {
//     thong_ke_md.getAllBillInMonth(today.getFullYear(), today.getMonth()+1)
//         .then(result => {
//             res.json({data: result});
//         }).catch(err => {
//             console.log(err);
//         })
// })

router.get('/testThongKe', (req, res) => {
    let startDate = dateDate_md.getDateWeekAgo().dateStartWeekAgo;
    let nextDate = dateDate_md.getDateWeekAgo().nextDate;
    let billEachDay = [];
    let data = thong_ke_md.getDataQuantityBillEachDay(startDate, nextDate);
    // if (data.allBillEachDay.day != "") {
    //     for (let i = 0; i < 7; i++) {
    //         billEachDay.push({
    //            data.allBillEachDay.day,
    //            data.allBillEachDay.quantity
    //         });
    //         console.log(billEachDay);
    //         startDate.setDate(startDate.getDate() + 1);
    //         nextDate.setDate(nextDate.getDate() + 1);

    //     }
    // }
    // thong_ke_md.getDoanhThuTheoThang(today.getMonth() + 1, today.getFullYear())
    //     .then(result => {
    //         result = JSON.parse(JSON.stringify(result))[0];
    //         let data2 = result.doanhthu;
    //         res.json({
    //             data,
    //             data2
    //         });
    //     }).catch(err => {
    //         console.log(err);
    //     });

    let data2 = thong_ke_md.dataDoanhThuTheoThang(today.getFullYear());
    // if (data2 === [] ) {

    // }
    res.json({ data, data2 });
})

router.get('/allbillsinweek', [checkRole.checkAdminRole], (req, res) => {
    thong_ke_md.getAllBillInWeek()
        .then(result => {
            res.json({
                data: result
            });
        }).catch(err => {
            console.log(err);
        })
})

router.get('/adduser', function (req, res, next) {
    res.render("admin/adduser");
})

router.post('/adduser', function (req, res, next) {
    let params = req.body;

    let data = user_md.addUser(params);
    data.then(result => {
        res.redirect("/admin/allusers");
    })
})

router.put("/user/edit", function (req, res, next) {
    var params = req.body;

    data = user_md.updateUser(params);

    if (!data) {
        res.json({
            status_code: 500
        })
    } else {
        data.then(result => {
            res.json({
                status_code: 200
            })
        }).catch(err => {
            res.json({
                status_code: 500
            })
        })
    }
})

router.delete("/user/delete", function (req, res, next) {
    var a_id = req.body.a_id;

    data = user_md.deleteUser(a_id);

    if (!data) {
        res.json({
            status_code: 500
        })
    } else {
        data.then(result => {
            res.json({
                status_code: 200
            })
        }).catch(err => {
            res.json({
                status_code: 500
            })
        })
    }
})

router.get('/addfood', function (req, res, next) {
    res.render("admin/addfood");
})

router.post('/adduser', function (req, res, next) {
    let params = req.body;

    let data = user_md.addUser(params);
    data.then(result => {
        res.redirect("/admin/allusers");
    })
})

router.post('/addfood', function (req, res, next) {
    let params = req.body;
    // console.log(params);

    let data = food_md.addFood(params);
    data.then(result => {
        res.redirect("/admin/allfoods");
    })
})

router.delete("/food/delete", function (req, res, next) {
    var f_id = req.body.f_id;

    data = food_md.deleteFood(f_id);

    if (!data) {
        res.json({
            status_code: 500
        })
    } else {
        data.then(result => {
            res.json({
                status_code: 200
            })
        }).catch(err => {
            res.json({
                status_code: 500
            })
        })
    }
})

router.put("/food/edit", function (req, res, next) {
    var params = req.body;
    console.log(params);
    data = food_md.updateFood(params);

    if (!data) {
        res.json({
            status_code: 500
        })
    } else {
        data.then(result => {
            res.json({
                status_code: 200
            })
        }).catch(err => {
            res.json({
                status_code: 500
            })
        })
    }
})

module.exports = router;