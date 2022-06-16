import React from 'react';
import SimpleFileUpload from 'react-simple-file-upload';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ProductListEvent from '../Components/ProductListEvent'
import { Link } from 'react-router-dom';
import { useState } from 'react';


function TradeOut() {
    const [item, setItem] = useState({
        condition: 50,
        online: false,
        event: {
            id: 1,
            name: ""
        }
    });

    const [validated, setValidated] = useState(false);

    const [dbResponded, setDbResponded] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    const setEvent = (event) => {
        setItem({
            ...item,
            event: event
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            console.log(item.title);
            const request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    age: item.age,
                    condition: item.condition,
                    event: item.event,
                    online: item.online,
                 })
            };
            
            fetch('/api/addProduct', request)
                .then(res => {
                    if (res.ok) {
                        setSucceeded(true);
                    } else {
                        setSucceeded(false);
                    }
                    setDbResponded(true);
                });
        }
        setValidated(true);

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItem({
            ...item,
            [name]: value
        });
    }

    function handleFile(url){
        setItem({
            ...item,
            image: url
        });
    }

    if (!dbResponded) {
        return (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group controlId="validationCustom01" as={Col}>
                        <FloatingLabel label="Name of Item">
                            <Form.Control
                                required
                                type="text"
                                name="title" 
                                placeholder="Enter Title" 
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Cool Title!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please provide a title.</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group controlId="validationCustom02" as={Col}>
                        <FloatingLabel label="Description">
                            <Form.Control
                                required
                                type="text"
                                name='description'
                                placeholder="Enter Description"
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Nice Description!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please provide a description.</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                <SimpleFileUpload
                        data-accepted="image/*"
                        data-maxFileSize="0.5"
                        name="image" id="image"
                        class="simple-file-upload"
                        apiKey="035d47aa53030d76819b63ab6ce9b05b"
                        onSuccess={handleFile}
                    />

                        
                    <Form.Group controlId="validationCustom04" as={Col}>
                        <Form.Label>Age</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                type="number"
                                name='age'
                                max={10}
                                min={0}
                                className="form-control"
                                aria-describedby="inputGroupPrepend"
                                onChange={handleChange}
                            />
                            <InputGroup.Text id="inputGroupPrepend">Year(s)</InputGroup.Text>
                            <Form.Control.Feedback type="invalid">Please provide an age.</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="validationCustom05" as={Col}>
                        <Form.Label>Condition</Form.Label>
                        <Row>
                            <Col lg={1}>
                                <Badge pill bg="danger">
                                    Poor
                                </Badge>
                            </Col>
                            <Col>
                                <Form.Range
                                    name='condition'
                                    onChange={
                                        (event) => {
                                            setItem({
                                                ...item,
                                                condition: event.target.value
                                            });
                                        }
                                    }
                                />
                            </Col>
                            <Col lg={1}>
                                <Badge pill bg="success">
                                    Excellent
                                </Badge>
                            </Col>
                        </Row>
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <Form.Group>
                        <Col>
                            <ButtonGroup>
                                <ToggleButton
                                key={0}
                                id='radio-0'
                                type="radio"
                                variant="info"
                                name="radio"
                                checked={item.online}
                                onChange={() => setItem({
                                    ...item,
                                    online: true
                                })}
                                >
                                    List item Online
                                </ToggleButton>
                                <ToggleButton
                                key={1}
                                id='radio-1'
                                type="radio"
                                variant="info"
                                name="radio"
                                checked={!item.online}
                                onChange={() => setItem({
                                    ...item,
                                    online: false
                                })}
                                >
                                    List item at Event
                                </ToggleButton>
                            </ButtonGroup>
                        </Col>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="validationCustom06" as={Col}>
                        <ProductListEvent online={item.online} event={item.event} setEvent={setEvent}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Button variant="primary" type="submit">
                                Submit
                        </Button>
                    </Form.Group>
                </Row>
            </Form>
        )
    } else if (dbResponded && !succeeded) {
        return (
            <Container>
                <Row>
                    <Col style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <h1>Error!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <h4>Something went wrong, please try again</h4>
                    </Col>
                </Row>
                <Row>
                    <Col style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Button variant="primary" type="success" onClick={
                            () => {
                                window.location.reload(); // Reload the page
                            }
                        }>Retry</Button>
                    </Col>
                </Row>
            </Container>
        )
    } else if (dbResponded && succeeded) {
        return (
            <Container>
                <Row>
                    <Col style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <h1>Success!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <h4>Your listing is now live</h4>
                    </Col>
                </Row>
                <Row>
                    <Col style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Link to="/">
                            <Button variant="primary" type="success">Back to Home</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TradeOut;