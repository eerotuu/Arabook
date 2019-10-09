const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
const url = 'mongodb://localhost:27017/';

const resFailed = (res) => {
    res.json({message: 'Failed.'});
}

/* GET All. */
router.get('/', function(req, res, next) {
    let q = {};
    if (Object.keys(req.query).length > 0) {
        if(typeof req.query.name != 'undefined') {
           q.name = new RegExp(req.query.name, 'i');
        }
        if(typeof req.query.title != 'undefined') {
            q.title = new RegExp(req.query.title, 'i');
        }
        if(typeof req.query.text != 'undefined') {
            q.text = new RegExp(req.query.text, 'i');
        }
        console.log(q)
    }
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            resFailed(res);
        } else {
            let collection = db.db('db').collection('posts');
            collection.find(q).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                    resFailed();
                } else if(result != null) {
                    res.json(result);
                } else {
                    res.json({message: 'no results found'})
                }
            });
        }
    });

});

/* GET by id */
router.get('/:id', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            resFailed(res);
        }
        var dbo = db.db('db');
        var query = {_id : new mongodb.ObjectID(req.params.id)};
        dbo.collection('posts').findOne(query, function(err, result) {
            if (err) {
                resFailed(res);
            } else if (result != null) {
                res.json(result);
            } else {
                res.json({message: 'no results found'})
            }

            db.close();
        });
    });
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
                    console.log(req.body);
                    res.send('Success');
                }
            });
        }
    });
});

/* DELETE by id */
router.delete('/:id', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err)
        }
        var dbo = db.db('db');
        var query = { _id: new mongodb.ObjectID(req.params.id)};
        dbo.collection('posts').deleteOne(query, function(err, result) {
            if (err) {
                console.log(err);
                res.json({message: 'Failed'})
            } else {
                res.json({message: 'Post with id: ' + req.params.id + ' deleted.'});
            }
            db.close();
        });
    });
});

/*UPDATE by id*/
router.patch('/:id', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db('db');
        var query = { _id: new mongodb.ObjectID(req.params.id) };
        var newvalues = { $set: req.body};
        dbo.collection('posts').updateOne(query, newvalues, function(err, result) {
            if (err) {
                res.json({message: 'Failed'});
            } else {
                res.json({message: 'Post with id: ' + req.params.id + ' updated.'})
            }

            db.close();
        });
    });
});
module.exports = router;
