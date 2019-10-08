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
                    console.log(req.body);
                    res.send('Success');
                }
            });
        }
    });
});

/*UPDATE by id*/
router.patch('/:id', function (req, res) {
    try{
        let collection = db.db('db').collection('posts');
        collection.updateOne({_id:req.params.id},
            {$set: {title:req.body.title, text:req.body.text} })
            .then(result =>{
                const { matchedCount, modifiedCount } = result;
                if(matchedCount && modifiedCount) {
                    console.log(`Successfully added a new review.`)}
            });

    }
    catch (err) {
        res.json({message:err});
    }


    if(err){
        console.log(err);
        res.send('Failed to update');
    }
    else {
        let collection = db.db('db').collection('posts');
        collection.updateOne({_id:req.params.id},
            {$set: {title:req.body.title, text:req.body.text} })
    }

});
module.exports = router;
