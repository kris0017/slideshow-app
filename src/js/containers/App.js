import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import CanvasComponent from '../components/CanvasComponent'
import db from '../../storage/db.json'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      countryIndex: 0
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    
  }

  previous() {
    let newIndex = this.state.countryIndex === 0 ? 9 : this.state.countryIndex - 1;
    this.setState({ countryIndex: newIndex }, () => {
      this.canvas.updateCanvas()
    })
  }

  next() {
    let newIndex = this.state.countryIndex === 9 ? 0 : this.state.countryIndex + 1;
    this.setState({ countryIndex: newIndex }, () => {
      this.canvas.updateCanvas()
    })
    
  }

  render() {
    return (
      <Container fluid >
        <Row className="justify-content-md-center">
          <Col md="10">
            <div className="content-container">
              <CanvasComponent ref={instance => { this.canvas = instance; }} />
              <img className="image" src={ require('../../img/' + db.countries[this.state.countryIndex].image) } alt={ db.countries[this.state.countryIndex].image }/>
            </div>
          </Col>
          
        </Row>
        <Row className="justify-content-center btn-title-container">
          <Col md="1" className="col-auto">
            <Button className="prev-btn" color="info" size="lg" onClick={ this.previous }>&lt;</Button>
          </Col>
          <Col md="8" className="col-auto">
            <h6 className="vertical-center">{ db.countries[this.state.countryIndex].name }</h6>
          </Col>
          <Col md="1" className="col-auto">
            <Button className="next-btn" color="info" size="lg" onClick={ this.next }>&gt;</Button>
          </Col>
        </Row>
      </Container>
         
    );
  }
}