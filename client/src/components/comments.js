import React from 'react'

const Comments = ({comments}) => {

    // check if there isn't any comments yet.
    if(typeof comments == 'undefined') {
        return (
            <li>No comments yet</li>
        )
    }

    // map all comments into elements.
    const rows = () => comments.map(c =>
        <ul>
            <li>{c.comment}</li>
            <li>{c.name}</li>
            <li>{c.date}</li>
        </ul>
    )

    return (
        <div>
            <li>Comments:</li>
            {rows()}
        </div>
    )
}

export default Comments