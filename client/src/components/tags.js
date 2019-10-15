import React from 'react'
import Badge from 'react-bootstrap/Badge'

const Tags = ({tags}) => {

    // check if there isn't any tags.
    if(typeof tags == 'undefined') {
        return (
            <li>No tags added in this post</li>
        )
    }

    // map all tags into elements
    const allTags = () => tags.map(tag =>
        <Badge key={tag} variant='secondary' style={{marginRight: 5, marginBottom: "0.6em"}}>{tag}</Badge>
    );

    return (
        <div>{allTags()}</div>
    )
};

export default Tags