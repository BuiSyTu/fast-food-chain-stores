var express = require('express');
var router = express.Router();
var bill_md = require('../models/bill');
var bill_detail_md = require('../models/bill_detail');

router.get('/list', (req, res) => {
    bill_md.getAllBills().then(data => {
        res.render('employee/index', { data: data, title: "Orders Management" });
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

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    try {
        var bill = await bill_md.getBillById(id);
    } catch (error) {
        console.log(error);
    }
    try {
        var bill_detail = await bill_detail_md.getAllItemByBillId(id);
    } catch (error) {
        console.log(error);
    }
    res.render('employee/update', { title: "Update Order", bill, bill_detail });
});

router.put('/update', (req, res) => {
    var id = req.body.id;
    var quantity = req.body.quantity;
    bill_detail_md.updateQuantity(id, quantity).then(data => {
        return res.jsonp(data);
    }).catch(err => {
        console.log(err);
    });
});

router.delete('/delete-item', (req, res) => {
    var id = req.body.id;
    bill_detail_md.deleteItem(id).then(data => {
        return res.jsonp(data);
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
});

module.exports = router;
