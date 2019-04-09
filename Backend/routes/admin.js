var express = require('express');
var router = express.Router();
const user_md = require('../models/user');

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


module.exports = router;