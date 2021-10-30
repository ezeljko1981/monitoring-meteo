import React from "react";
import ChartT from './ChartT'
import ChartH from './ChartH'
import ChartP from './ChartP'
import ChartX from './ChartX'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Graphs() {
  return (
    <div>
      <Container fluid>
        <Row xs="6">
          <Col xs="1"></Col>
          <Col xs="5"><ChartX /></Col>
          <Col xs="5"><ChartT /></Col>
          <Col xs="1"></Col>
        </Row>
        <Row xs="6">
          <Col xs="1"></Col>
          <Col xs="5"><ChartH /></Col>
          <Col xs="5"><ChartP /></Col>
          <Col xs="1"></Col>
        </Row>
        <Row>
          <Col xs={12}>
  		      <h5 class="text-muted">Web application "monitoring-meteo" created by <a href="https://www.linkedin.com/in/zeljkoeremic/">Željko Eremić, PhD</a></h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Graphs;
