import React, { useState , useEffect} from 'react'
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";



const Comments = ({postId, comments, setComments}) => {



    const getList = () => {

    };

    useEffect(() => {
        fetch('/api/posts/' + postId + '/comments')
            .then(res => res.json())
            .then((result) => {
                setComments(result);
            },)
    }, []);

    // check if there isn't any comments yet.
    if(typeof comments == 'undefined') {
        return (
            <li>No comments yet</li>
        )
    }

    // map all comments into elements.
    const rows = () => comments.map(c =>
        <Comment c={c} />
    )

    return (
        <div>
            <h5>Comments</h5>
            {rows()}
        </div>
    )
}

const Comment = ({c})=> {
    let dateTime = new Date(c.date);
    let difference = dateTime.getTimezoneOffset() - new Date().getTimezoneOffset();
    console.log(difference);

    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let dateString = dateTime.getDay() + ' ' + months[dateTime.getMonth()] + ' ' + dateTime.getFullYear() + ' '
        + (dateTime.getHours() - difference)+ ':' + String(dateTime.getMinutes()).padStart(2, "0");

    return(
        <Toast>
            <Toast.Header>
                <strong className="mr-auto">{c.name}</strong>
                <small>{dateString}</small>
            </Toast.Header>
            <Toast.Body>{c.comment}</Toast.Body>
        </Toast>
    )
}


export default Comments