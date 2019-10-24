import React, { Component } from 'react';
import Post from './post.js'
import Card from 'react-bootstrap/Card'
import Tags from "./tags";
import Button from "react-bootstrap/Button";

class Posts extends Component {

    constructor(props){
        super(props);
        this.state = {
            postList: []
        }
    }

    componentDidMount() {
        this.getList('/api/posts');
    }

    // fetch posts from api and set state
    getList = (url) => {
        if(typeof url === 'undefined') url = '/api/posts';
        fetch(url)
            .then(res => res.json())
            .then(postList => this.setState({ postList }))
    };

    render() {
        const { postList } = this.state;

        // map postList into post components
        console.log(postList)
        const posts = () => postList.map(post =>
            <Post key={post._id} post={post} comments={post.comments} getList={this.getList}/>
        );

        if(postList.length > 0) {
            return (
                <div>
                    {posts()}
                </div>

            );
        }

        return (
            <Card style={{marginBottom: "0.5em"}} className="text-center" >
                <Card.Body>
                    <Card.Title>No posts found</Card.Title>
                    <Card.Text>Try with other search</Card.Text>
                </Card.Body>
            </Card>
        )

    }
}

export default Posts