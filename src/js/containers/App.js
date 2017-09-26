import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import CanvasComponent from '../components/CanvasComponent'
import db from '../../storage/db.json'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      countryIndex: 0,
      opacity: 0.25
    };

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.showDescription = this.showDescription.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
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

  showDescription() {
    console.log('fsdfsd')
  }

  mouseOver() {
    this.setState({ opacity: 1 })
  }

  mouseLeave() {
    this.setState({ opacity: 0.25 })
  }

  render() {
    return (
      <Container fluid >
        <Row className="justify-content-md-center">
          <Col md="10">
            <div className="content-container">
              <CanvasComponent ref={instance => { this.canvas = instance; }} />
              <img src={ require('../../img/' + db.countries[this.state.countryIndex].image) } 
                   alt={ db.countries[this.state.countryIndex].image }
                   className="image rounded" 
                   onMouseOver={ this.mouseOver } 
                   onMouseLeave={ this.mouseLeave } />
              <Button style={{opacity: this.state.opacity}} 
                      className="btn-show-info" size="lg" 
                      onMouseOver={ this.mouseOver }  
                      onClick={ this.showDescription }></Button>
            </div>
          </Col>
          
        </Row>
        <Row className="justify-content-center">
          <Col md="1" className="col-auto">
            <Button color="info" size="lg" onClick={ this.previous }>&lt;</Button>
          </Col>
          <Col md="8" className="col-auto">
            <h6 className="vertical-center text-center font-weight-bold">{ db.countries[this.state.countryIndex].name }</h6>
          </Col>
          <Col md="1" className="col-auto">
            <Button className="float-right" color="info" size="lg" onClick={ this.next }>&gt;</Button>
          </Col>
        </Row>
      </Container>
         
    );
  }
}