var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');
var user_md = require('../models/user');
var hash = require('../common/hash_password');
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/signup', (req, res) => {
    res.render('user/signup', { title: 'Đăng ký' });
});

router.post('/signup', (req, res) => {
    let data = req.body;
    // chua test auto increment lai
    // user_md.getMaxUserId().then(users => {
    //     data.a_id = users[0].ID_MAX + 1;
    // })
    var hashPassword = hash.hashPassword(data.a_password);
    let account = {
        a_username: data.a_username,
        a_password: hashPassword,
        a_role: "user", // role la 0, 1, 2 3 tuong ung voi nhung quyen nao
        a_name: data.a_name,
        a_dob: data.a_dob,
        a_gender: data.a_gender,
        a_address: data.a_address,
        a_phone: data.a_phone,
        a_email: data.a_email,
        a_created_at: dateFormat(new Date(), "yyyy-mm-dd")
    }

    user_md.addUser(account).then(result => {
        res.redirect("/signin");
        console.log("Sign up success");
    }).catch(err => {
        console.log(err);
    })
})

router.get('/signin', (req, res) => {
    res.render('user/signin', { title: 'Đăng nhập', data: {} });
});

router.post('/signin', (req, res) => {
    let data = req.body;
    user_md.getUserByUsername(data.a_username)
        .then(users => {
            let user = users[0];
            if (user) {
                let checkPassword = hash.comparePassword(data.a_password, user.a_password);
                if (checkPassword) {
                    req.session.user = user;
                    if (user.a_role === 'admin') {
                        res.redirect('/admin');
                    } else if (user.a_role === 'employee') {
                        res.redirect('/employee/list?pageIndex=1');
                    } else {
                        res.redirect("/users");
                    }
                } else {
                    res.render("user/signin", { data: { error: "Mật khẩu không chính xác, vui lòng đăng nhập lại!" } })
                }
            } else {
                res.render("user/signin", { data: { error: "Tên người dùng không tồn tại!" } });
            }
        }).catch(err => {
            console.log(err);
        })
});

router.get("/logout", (req, res) => {
    req.session.user = null;
    res.redirect("/signin");
});

module.exports = router;
