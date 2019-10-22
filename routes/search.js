const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const db = require('../db');


router.get('/', function (req, res) {

    let query = {
        $or: [
            {tags: new RegExp(req.query.tag, 'i')},
            {title: new RegExp(req.query.title, 'i')}
        ]

    };

    db.post.find(query).sort('-date').exec( function (err, result) {
        if(err) resFailed(res, err);
        console.log(result);
        res.json(result);
    })
});
module.exports = router;