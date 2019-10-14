/*
* script for creating test data
 */

const db = require('./db');

console.log('creating test data...')

let comment = new db.comment({
    name: 'anonymous',
    date: new Date(),
    comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
});

comment.save(function (err) {
    if (err) return console.error(err.stack);
    console.log('comment added');
});

let post = new db.post({
    name: 'winnie the pooh',
    date: new Date(),
    title: 'Lorem Ipsum',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    link: 'https://www.lipsum.com/',
    tags: ['useful']
});

post.comments.push(comment._id);
let ok = false;
post.save(function (err) {
    if (err) return console.error(err.stack);
    console.log('post added');
    console.log('exiting...')
    process.exit(0);
});



