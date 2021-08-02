import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Form, Row, Container } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';
import  './visibility-filter-input.scss';

function VisibilityFilterInput(props){
    return (
       
        <Row id="visibility-filter" className = "justify-content-center">
            <Col lg={6}>
                <Form>
                    <Form.Group controlId = "formGroupVisibilityInput" as={Col}>
                        <Form.Control type="text" value={props.visibilityFilter} name="filterInput" placeholder="filter movies" onChange={e => props.setFilter(e.target.value)}
                            value={props.visibilityFilter} />
                    </Form.Group>
                </Form>
            </Col>
        </Row>
        
    );
}

export default connect(null, { setFilter })(VisibilityFilterInput);