import React, {useState} from 'react'
import Tags from './tags'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Modal} from "react-bootstrap";
import Comments from "./comments";
import AddComments from "./add-comments";

const Post = ({post, getList}) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [comments, setComments] = useState([]);
    let commentsText = '';

    if(post.comments.length < 2) {
        if(post.comments.length < 1) {
            commentsText = 'No comments yet'
        } else {
            commentsText = post.comments.length + ' Comment'
        }
    } else {
        commentsText = post.comments.length + ' Comments'
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
                <Button variant="primary" onClick={() => setModalShow(true)}>{commentsText}</Button>
            </Card.Body>

            <CreatePostModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                    getList();
                }}

                post = {post}
                comments = {comments}
                setComments = {setComments}
            />
        </Card>

    )
};

function CreatePostModal(props){
    let post = props.post;
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.post.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div>{post.text}</div>
                    <a href={post.link}>{post.link}</a>
                    <img src={post.image} alt="" style={{marginBottom: "1em"}}/>
                    <Tags tags={post.tags} />
                </div>

                <h5>Reply to this post</h5>
                <AddComments addComments = {post.addComment} postId={post._id} setComments={props.setComments}/>
                <Comments postId = {post._id} comments={props.comments} setComments={props.setComments}/>
            </Modal.Body>
        </Modal>
    );
}

export default Post