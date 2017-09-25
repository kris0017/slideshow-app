import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { random } from '../helpers'


export default class App extends Component {
  constructor() {
    super();

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  componentDidMount() {
    this.updateCanvas()
  }

  previous() {
    console.log('prev')
    this.updateCanvas()
  }

  next() {
    console.log('next')
    this.updateCanvas()
  }

  updateCanvas() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Create gradient
    var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, random());
    grd.addColorStop(1, random());

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  render() {
    return (
      <Container fluid>
        <Row className="app justify-content-md-center">
          <Col md="10">
            <canvas ref="canvas" className="canvas">

            </canvas>
          </Col>
          <Col md="10" className="d-flex justify-content-between">
            <Button color="info" size="lg" onClick={ this.previous }>&lt;</Button>
            <Button color="info" size="lg" onClick={ this.next }>&gt;</Button>
          </Col>
        </Row>
      </Container>
         
    );
  }
}