import React from 'react'

const Tags = ({tags}) => {

    // check if there isn't any tags.
    if(typeof tags == 'undefined') {
        return (
            <li>No tags added in this post</li>
        )
    }

    // map all tags into elements
    const allTags = () => tags.map(tag =>
        <b>{tag.tag} </b>
    )

    return (
        <li>{allTags()}</li>
    )
}

export default Tags