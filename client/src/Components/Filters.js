import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'


function Filters(props) {


    const handleChange = (event) => {
        const { name, value } = event.target;
        props.setFilters({
            ...(props.getFilters()),
            [name]: value
        });
    }

    const [category, setCategory] = useState("none");

    return (
        <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Filters</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Row>
                            <Col lg={1}>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Online" onChange={
                                        (event) => {
                                            props.setFilters({
                                                ...(props.getFilters()),
                                                online: event.target.checked
                                            });
                                        }
                                    } />
                                    <Form.Check type="checkbox" label="Event" onChange={
                                        (event) => {
                                            props.setFilters({
                                                ...(props.getFilters()),
                                                event: event.target.checked
                                            });
                                        }
                                    } />
                                </Form.Group>
                            </Col>
                            <Col>
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
                                                name='minCondition'
                                                onChange={
                                                    (event) => {
                                                        props.setFilters({
                                                            ...(props.getFilters()),
                                                            minCondition: event.target.value
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
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={2}>
                                <Form.Group controlId="formBasicRange">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control name='maxAge' type="number" min="0" max="10" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group controlId="formControlsSelect" as={Col}>
                                    <Form.Label>Category</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="category"
                                                placeholder="Select a category"
                                                value={category}
                                                onChange={(e) => {
                                                    setCategory(e.target.value)
                                                    if (e.target.value === "none") {
                                                        var t = props.getFilters();
                                                        delete t.category;
                                                        props.setFilters(t);
                                                    } else {
                                                        handleChange(e)
                                                    }
                                                }}
                                            >
                                                <option value="none">Select a category</option>
                                                <option value="shoe">Shoes</option>
                                                <option value="t-shirt">T-Shirts</option>
                                                <option value="shirt">Shirts</option>
                                                <option value="dress">Dresses</option>
                                                <option value="trouser">Trousers</option>
                                                <option value="jeans">Jeans</option>
                                                <option value="jacket">Jackets</option>
                                                <option value="coat">Coats</option>
                                                <option value="hoodie">Hoodies</option>
                                                <option value="shorts">Shorts</option>
                                                <option value="sports">Sports</option>
                                                <option value="other">Other Items</option>
                                            </Form.Control>
                                            <Form.Control.Feedback>Cool Category!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">Please provide a Category.</Form.Control.Feedback>
                                        </Col>
                                        <Col>
                                            <Button
                                                onClick={(e) => {
                                                    setCategory("none")
                                                    var t = props.getFilters();
                                                    delete t.category;
                                                    props.setFilters(t);
                                                }}
                                                variant="danger"
                                            >
                                                x
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );

}

export default Filters;