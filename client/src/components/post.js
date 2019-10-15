import React from 'react'
import Tags from './tags'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Post = ({post}) => {
    let commentsText = ' Comments';
    if(post.comments.length < 2) {
        if(post.comments.length < 1) {
            commentsText = 'No comments yet'
        } else {
            commentsText = post.comments.length + ' Comment'
        }
    }

    let dateTime = new Date(post.date);
    let difference = dateTime.getTimezoneOffset() - new Date().getTimezoneOffset();
    console.log(difference);

    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let dateString = dateTime.getDay() + ' ' + months[dateTime.getMonth()] + ' ' + dateTime.getFullYear() + ' '
        + (dateTime.getHours() - difference)+ ':' + String(dateTime.getMinutes()).padStart(2, "0");


    // return post component containing Tags and Comments components -> see comments.js & tags.js
    return (
        <Card style={{marginBottom: "0.5em"}} >
            <Card.Header>Posted by <b>{post.name}</b> at {dateString}</Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.text}</Card.Text>
                <a href={post.link}>{post.link}</a>
                <img src={post.image} alt="" style={{marginBottom: "1em"}}/>
                <Tags tags={post.tags} />
                <Button variant="primary">{commentsText}</Button>
            </Card.Body>
        </Card>
    )
};

export default Post