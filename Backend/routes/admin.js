var express = require('express');
var router = express.Router();
const user_md = require('../models/user');
const bill_md = require('../models/bill');
const food_md = require('../models/foods');

/* GET home page. */
router.get('/allusers', function (req, res, next) {
    let data = {};
    user_md.getAllUsers()
        .then(users => {
            data = users;
            // res.json({
            //     data: data
            // })
            res.render("admin/allusers", { data: data });
            console.log(data);
        })
});

router.get('/user/:id', function (req, res, next) {
    let id = req.params.id;

    user_md.getUserById(id)
        .then(users => {
            data = users[0];
            res.render("admin/user", { data: data });
            // res.json({
            //     data: data
            // })
        })
})

router.get('role/:id', function (req, res, next) {
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
router.get('/allbills', (req, res, next) => {
    bill_md.getAllBills()
        .then(bills => {
            res.json({
                data: bills
            });
        })
})


// hoa don theo ma hoa don : b_id
router.get('/bill/:id', (req, res, next) => {
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
router.get('/allfoods', (req, res, next) => {
    let data = {};
    food_md.getAllFoods()
        .then(foods => {
            data = foods;
            // res.json({
            //     data: data
            // })
            res.render("admin/allfoods", { data: foods });
            console.log(data);
        })
})

//get food by id: 
router.get('/food/:id', (req, res, next) => {
    let id = req.params.id;
    let data = {};

    food_md.getFoodById(id)
        .then(foods => {
            data = foods[0];
            // res.json({
            //     data: data
            // });
            res.render("admin/food", { data: data });
            console.log(data);
        })
})


router.get('/', function (req, res, next) {
    res.render("admin/index")
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
            res.json({ status_code: 200 })
        }).catch(err => {
            res.json({ status_code: 500 })
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
            res.json({ status_code: 200 })
        }).catch(err => {
            res.json({ status_code: 500 })
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
            res.json({ status_code: 200 })
        }).catch(err => {
            res.json({ status_code: 500 })
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
            res.json({ status_code: 200 })
        }).catch(err => {
            res.json({ status_code: 500 })
        })
    }
})

module.exports = router;