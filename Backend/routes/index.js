var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');
var user_md = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        data: {}
    });
});

router.post('/signup', (req, res) => {
    let data = req.body;

    // chua test auto increment lai
    // user_md.getMaxUserId().then(users => {
    //     data.a_id = users[0].ID_MAX + 1;
    // })

    let account = {
        a_username: data.a_username,
        a_password: data.a_password,
        a_role: 0, // role la 0, 1, 2 3 tuong ung voi nhung quyen nao
        a_name: data.a_name,
        a_phone: data.a_phone,
        a_gender: data.a_gender,
        a_email: data.a_email,
        a_created_at: dateFormat(new Date(), "yyyy-mm-dd")
    }

    user_md.addUser(account).then(result => {
        console.log(dateFormat(new Date(), "yyyy-mm-dd"));
        console.log("Sign up success");
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;