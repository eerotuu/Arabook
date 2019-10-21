import React, { Component } from 'react';
import Post from './post.js'

class Posts extends Component {

    constructor(props){
        super(props);
        this.state = {
            postList: []
        }
    }

    componentDidMount() {
        this.getList();
    }

    // fetch posts from api and set state
    getList = () => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(postList => this.setState({ postList }))
    };

    render() {
        const { postList } = this.state;

        // check if there are any posts to render
        if(typeof postList == 'undefined' || postList.size === 0) {
            return (
                <li>No posts yet</li>
            )
        }

        // map postList into post components
        console.log(postList)
        const posts = () => postList.map(post =>
            <Post key={post._id} post={post} comments={post.comments} getList={this.getList}/>
        )

        return (
            <div>
                {posts()}
            </div>

        );
    }
}

export default Posts