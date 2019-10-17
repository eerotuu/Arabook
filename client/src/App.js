import React, { useRef } from 'react';
import './App.css';

import Posts from './components/posts';
import PostForm from './components/form'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Form, FormControl, Button, Container, Modal} from 'react-bootstrap'


function App() {

    const [modalShow, setModalShow] = React.useState(false);
    const childRef = useRef();

  return (
    <div style={{minWidth: 580}}>

        <Navbar bg="dark" variant="dark">
            <Form inline className="justify-content-center" style={{width: "100%"}}>
                <Button variant="outline-info" style={{marginRight: "0.5em"}} onClick={() => setModalShow(true)}>Create new post</Button>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{width: "40%", minWidth: 300}} />
                <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>

        <Container style={{marginTop: "1em"}}>
            <Posts ref={childRef}/>
        </Container>

        <CreatePostModal
            show={modalShow}
            onHide={() => {
                setModalShow(false);
            }}
            refreshList={() => {
                childRef.current.getList();
            }}
        />
    </div>

  );
}

function CreatePostModal(props){

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create new post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PostForm onHide={props.onHide} refreshList={props.refreshList}/>
            </Modal.Body>
        </Modal>
    );
}

export default App;
