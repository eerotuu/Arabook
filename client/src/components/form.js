import {Button, Form} from "react-bootstrap";
import React from "react";

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            title: '',
            text: '',
            link: '',
            image: '',
            tags: '',
        };
        this.hide = props.onHide;
        this.refreshList = props.refreshList
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;

        this.setState({[name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.state.tags = this.state.tags.split(',');
        fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        }).then(function(response) {
            return response.text()
        }, function(error) {
            console.log(error.message);
        })
        this.hide();
        this.refreshList();
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Control name="name" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Control name="title"  type="text" placeholder="Title" value={this.state.title} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control name="text" as="textarea" rows="3" placeholder="Text (optional)" value={this.state.text} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Control name="link"  type="text" placeholder="Link (optional)" value={this.state.link} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Control name="image"  type="text" placeholder="Image (optional)" value={this.state.image} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Control name="tags"  type="text" placeholder="Tags - separate with , (optional)" value={this.state.tags} onChange={this.handleChange} />
                </Form.Group>
                <Button type="submit">Create</Button>
            </Form>
        );
    }
}

export default PostForm
