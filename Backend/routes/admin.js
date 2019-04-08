var express = require('express');
var router = express.Router();
const user_md = require('../models/user');

/* GET home page. */
router.get('/allusers', function (req, res, next) {
    let data = {};
    user_md.getAllUsers()
        .then(users => {
            res.json({ data: users });
        })
});

router.get('/user/:id', function (req, res, next) {
    let id = req.params.id;

    user_md.getUserById(id)
        .then(users => {
            data = users[0];
            console.log(data.a_row);
            res.json({ data: data })
        })
})

router.get('role/:id', function (req, res, next) {
    let id = req.params.id;

    user_md.getRoleById(id)
        .then(users => {
            data.role = users[0];
            res.json({ data: data })
        })
})

module.exports = router;