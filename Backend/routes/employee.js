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
    })
})

router.post('/add-bill', (req, res) => {
    var param = req.body;
    if (param) {
        bill = {
            customer_id: param.customer_id,
            employee_id: param.employee_id,
            s_id: param.s_id,
            b_created_at: new Date(),
            b_status: param.b_status,
            b_hour: param.b_hour,
            b_day_of_week: param.b_day_of_week,
            b_payment_method: param.b_payment_method
        }

    }
})

module.exports = router;
