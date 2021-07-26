import React, { memo } from 'react';
import { Row, Col } from 'reactstrap';

const Header = ({ title }) => {
    return (
        <header className="hearder">
            <Row className="header-bar">
                <Col xs={12} sm={12} md={12} lg={12} >
                    {title}
                </Col>
            </Row>
        </header>
    )
}

export default memo(Header)
