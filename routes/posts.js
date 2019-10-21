const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const db = require('../db');

const resFailed = (res, err) => {
    console.log(err);
    res.status(500);
    res.json({message: 'Failed.'});
};

/* GET All. */
router.get('/', function (req, res, next) {
    let q = {};
    if (Object.keys(req.query).length > 0) {
        if (typeof req.query.name != 'undefined') {
            q.name = new RegExp(req.query.name, 'i');
        }
        if (typeof req.query.title != 'undefined') {
            q.title = new RegExp(req.query.title, 'i');
        }
        if (typeof req.query.text != 'undefined') {
            q.text = new RegExp(req.query.text, 'i');
        }
        console.log(q)
    }
    db.post.find(q).populate('comments').sort('-date').exec(function (err, posts) {
        if (err) {
            resFailed(res, err);
        }
        console.log(posts);
        if (typeof posts != 'undefined' && posts.length > 0) {
            res.json(posts);
        } else {
            res.json({message: 'no results found'});
        }

    });
});

/*GET comments from post*/
router.get('/:id/comments', function (req, res, next) {
    let query = {};
    try {
        query = {_id: new mongodb.ObjectID(req.params.id)};
        db.post.findOne(query).populate('comments').exec(function (err, post) {
            if (err) throw err;
            console.log(post.comments);

            if (post !== null) {
                res.json(post.comments);
            } else {
                res.json({message: 'not results found'});
            }
        })
    } catch (err) {
        if (err) {
            resFailed(res, err);
        } else {
            res.json({message: 'Invalid ObjectId format'});
        }
    }
});

/* GET by id */
router.get('/:id', function (req, res, next) {
    let query = {};
    try {
        query = {_id: new mongodb.ObjectID(req.params.id)};
        db.post.findOne(query).populate('comments').exec(function (err, post) {
            if (err) throw err;
            console.log(post);

            if (post !== null) {
                res.json(post);
            } else {
                res.json({message: 'not results found'});
            }
        })
    } catch (err) {
        if (err) {
            resFailed(res, err);
        } else {
            res.json({message: 'Invalid ObjectId format'});
        }
    }
});

/* POST comment*/
router.post('/:id/comments', function (req, res) {
    if (typeof req.body.date == 'undefined') {
        req.body.date = new Date();
    } else {
        req.body.date = new Date(req.body.date);
    }
    
    console.log(req.body);

    let postId = new mongodb.ObjectID(req.params.id);
    let comment = new db.comment(req.body);
    comment.validate((error) => {
        if(error) {
            res.status(400);
            res.json({error: error.message});
        } else {
            console.log(comment);
            let session = db.mongoose.startSession();

            session.then(_session => {
                session = _session;
                // Start a transaction
                session.startTransaction();
            }).
            then(() => comment.save()).
            then(() => db.post.findOneAndUpdate (
                {_id: postId},
                {$push: {comments: comment._id}}).
            then(() => {
                res.status(201);
                res.json({message: 'Comment created successfully.'})}).
            catch((error) => {
                session.abortTransaction();
                res.status(400);
                res.json({error: error.message})
            }));
        }
    });

});


/* POST post */
router.post('/', function (req, res) {

    if (typeof req.body.date == 'undefined') {
        req.body.date = new Date();
    } else {
        req.body.date = new Date(req.body.date);
    }

    console.log(req.body);

    let post = new db.post(req.body);
    post.save(function (err, result) {
        if (err) {
            resFailed(res, err);
        } else {
            res.json({message: 'new post created', obj: post});
        }

    });
});

/* DELETE by id */
router.delete('/:id', function (req, res) {
    let query = {_id: new mongodb.ObjectID(req.params.id)};

    db.post.deleteOne(query, function (err) {
        if (err) {
            resFailed(res, err);
        } else {
            res.json({message: 'post with id: ' + req.params.id + ' deleted'});
        }
    });
});

/*UPDATE by id*/
router.patch('/:id', function (req, res) {

    let query = {_id: new mongodb.ObjectID(req.params.id)};

    db.post.findOneAndUpdate(query, req.body , function (err, result) {
        if(err) resFailed(res,err);
        res.json({message: 'update ok'})
    })
});

module.exports = router;
