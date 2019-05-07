var express = require('express');
var router = express.Router();
var bill_md = require('../models/bill');
var bill_detail_md = require('../models/bill_detail');
var user_md = require('../models/user');

router.get('/list', (req, res) => {
    bill_md.getAllBills().then(data => {
        res.render('employee/index', { data: data });
    }).catch(err => {
        console.log(err);
    });
});

router.get('/detail/:id', (req, res) => {
    var id = req.params.id;
    bill_detail_md.getAllItemByBillId(id).then(msg => {
        return res.jsonp(msg);
    }).catch(err => {
        console.log(err);
    });
});

router.get('/order/:id', (req, res) => {
    var id = req.params.id;
    bill_md.getBillById(id).then(msg => {
        return res.jsonp(msg);
    }).catch(err => {
        console.log(err);
    });
});

router.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    bill_detail_md.deleteAllItemByBillId(id).then(msg1 => {
        bill_md.deleteBill(id).then(msg2 => {
            return res.jsonp(msg2);
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;
