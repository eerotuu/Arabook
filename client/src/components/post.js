import React from 'react'
import Comments from './comments.js'
import Tags from './tags'

const Post = ({post}) => {
    // return post component containing Tags and Comments components -> see comments.js & tags.js
    return (
        <div>
            <li>{post.title}</li>
            <ul>
                <li>{post.text}</li>
                <li>{post.timestamp}</li>
                <li>{post.name}</li>
                <Tags tags={post.tags} />
                <Comments comments={post.comments} />
            </ul>
        </div>
    )
}

export default Post