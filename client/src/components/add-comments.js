import React from "react";
import {Button, Form} from "react-bootstrap";
import Comments from "./comments";
import Card from "react-bootstrap/Card";

class AddComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            comment: ''
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
    }

    render() {
        return (
            <Card style={{marginBottom: "0.5em"}} >
                <Card.Header>New Comment</Card.Header>
            <Form onSubmit={this.handleSubmit}>
                <Card.Body>
                <Form.Group>
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Nickname" value={this.state.name}
                                  onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control name="comment" type="text" placeholder="Comment" value={this.state.comment}
                                  onChange={this.handleChange}/>
                </Form.Group>
                <Button type="submit">Reply</Button>
                </Card.Body>
            </Form>
            </Card>
        );
    }
}

export default AddComments