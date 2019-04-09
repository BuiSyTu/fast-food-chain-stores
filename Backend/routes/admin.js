var express = require('express');
var router = express.Router();
const user_md = require('../models/user');
const bill_md = require('../models/bill');

router.get('/', function (req, res, next) {
    res.render("admin/index")
})

/* GET home page. */
router.get('/allusers', function (req, res, next) {
    user_md.getAllUsers()
        .then(users => {
            res.json(users);
        })
});

router.get('/user/:id', function (req, res, next) {
    let id = req.params.id;

    console.log(id);

    user_md.getUserById(id)
        .then(users => {
            res.json(users);
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

module.exports = router;