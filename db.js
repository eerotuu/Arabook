const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('connected to database')
});

const commentSchema =  new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    comment: { type: String, required: true }

}, {collection: 'comments'});

const postSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String, required: false },
    text: { type: String, required: false },
    image: { type: String, required: false },
    tags: [{type: String, required: false}],
    date: { type: Date, required: true },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments', required: false}] // reference to the comments
}, {collection: 'posts'});


exports.comment = mongoose.model('comments', commentSchema);
exports.post = mongoose.model('posts', postSchema);