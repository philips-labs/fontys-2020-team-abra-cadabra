import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { faChartLine, faFireAlt, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function FilterButtons() {
    return (
        <div class="rounded container">
            <Row>
                <Col md="3">
                    <Button variant="primary"><FontAwesomeIcon icon={faCertificate} />New</Button>    
                    <Button variant="primary"><FontAwesomeIcon icon={faFireAlt} /> Hot</Button>
                    <Button variant="primary"><FontAwesomeIcon icon={faChartLine} /> Top</Button>
                </Col>
            </Row>

        </div>
    )
}
export default FilterButtons;