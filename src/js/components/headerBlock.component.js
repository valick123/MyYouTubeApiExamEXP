import React from "react";
import { Col, Container, Row } from "reactstrap";

export const HeaderBlock = props =>{
    return(
        <Container>
            <Row>
                <Col md={12}>
                    <div className="header-block">
                        <h1 className="header-block-title">search and url's parse service</h1>
                        <p className="header-block-text">
                            This srevice allows you to search posts by keywords and by existing URL's.
                            Just enter you request or paste your link here, choose necessary sourse and click the button.
                        </p>
                        <p className="header-block-subtext">
                            Now it supports just YouTube but there is way for improvement.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
        
    )
}