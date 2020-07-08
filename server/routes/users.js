var express = require('express');
var router = express.Router();
var dbConnection = require('../db/index');
const e = require('express');

router.get('/', function(req, res, next){
    dbConnection.query('SELECT * FROM users', function(err,rows){
        if(err){
            req.flash('error', err);
            res.render('users', {data: ''});
        }
        else{
            res.render('users', {data: rows});
        }
    });
});

module.exports = router;