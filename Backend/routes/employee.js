var express = require('express');
var router = express.Router();
var bill_md = require('../models/bill');
var bill_detail_md = require('../models/bill_detail');
var moment = require("moment");
var checkRole = require('../middleware/checkRole');

router.get('/list', [checkRole.checkEmployeeRole], (req, res) => {
    var pageIndex = ((req.query.pageIndex > 0) ? req.query.pageIndex : 1) || 1;
    bill_md.getAllBills(12, pageIndex).then(data => {
        data.forEach(element => {
            var created_at = element.b_created_at;
            element.moment_date = moment(created_at).calendar();
        });
        res.render('employee/index', { data: data, title: "Orders Management" });
    }).catch(err => {
        console.log(err);
    });
});

router.get('/profile', [checkRole.checkEmployeeRole], (req, res) => {
    res.render('employee/profile', { title: "Your Profile" });
});

router.get('/detail/:id', [checkRole.checkEmployeeRole], (req, res) => {
    var id = req.params.id;
    bill_detail_md.getAllItemByBillId(id).then(msg => {
        return res.jsonp(msg);
    }).catch(err => {
        console.log(err);
    });
});

router.get('/edit/:id', [checkRole.checkEmployeeRole], async (req, res) => {
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
    res.render('employee/update', { title: "Update Order", bill, bill_detail, moment });
});

router.put('/update', [checkRole.checkEmployeeRole], async (req, res) => {
    var id = req.body.id;
    var quantity = req.body.quantity;

    try {
        var b_ids = await bill_detail_md.getBillIdByBDId(id);
    } catch (error) {
        console.log(error);
    }

    var b_id = b_ids[0].b_id;

    try {
        var data1 = await bill_detail_md.updateQuantity(id, quantity);
    } catch (error) {
        console.log(error);
    }

    try {
        var data2 = await bill_md.updateDate(b_id);
        return res.jsonp(data1);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/delete-item', [checkRole.checkEmployeeRole], async (req, res) => {
    var id = req.body.id;

    try {
        var b_ids = await bill_detail_md.getBillIdByBDId(id);
    } catch (error) {
        console.log(error);
    }

    var b_id = b_ids[0].b_id;

    try {
        var data1 = await bill_detail_md.deleteItem(id);
    } catch (error) {
        console.log(error);
    }

    try {
        var data2 = await bill_md.updateDate(b_id);
        return res.jsonp(data1);
    } catch (error) {
        console.log(error);
    }
});

router.put('/payment', [checkRole.checkEmployeeRole], async (req, res) => {
    var b_id = req.body.id;

    try {
        var data1 = await bill_md.updateBillStatus(b_id, 1);
    } catch (error) {
        console.log(error);
    }

    try {
        var data2 = await bill_md.updateDate(b_id);
        return res.jsonp(data1);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/delete/:id', [checkRole.checkEmployeeRole], (req, res) => {
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
