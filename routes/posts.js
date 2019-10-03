const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

/* GET All. */
router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            res.send('failed');
        } else {
            let collection = db.db('db').collection('posts');
            collection.find({}).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                } else if(result) {
                    res.json(result);
                } else {
                    res.send('failed');
                }
            });
        }
    });
});

/* GET by id */
router.get('/:id', function(req, res, next) {

    res.send('id: ' + req.params.id);
});

/* POST */
router.post('/', function (req, res) {

    if(req.body.timestamp === 'undefined') {
        req.body.timestamp = new Date();
    } else {
        req.body.timestamp = new Date(req.body.time);
    }

    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            res.send('failed');
        } else {
            let collection = db.db('db').collection('posts');
            collection.insertOne(req.body, function(err, result) {
                if (err) {
                    console.log(err);
                    res.send('failed')
                } else {
                    res.send('Success');
                }
            });
        }
    });
});


module.exports = router;
