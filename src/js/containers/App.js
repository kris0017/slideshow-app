import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import CanvasComponent from '../components/CanvasComponent'
import InfoModal from '../components/InfoModal'
import db from '../../storage/db.json'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      countryIndex: 0,
      opacity: 0.25,
      showDescription: false
    };

    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.toggleDescription = this.toggleDescription.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }

  /* navigates to the previous country in the array of countries */
  previous() {
    let newIndex = this.state.countryIndex === 0 ? 9 : this.state.countryIndex - 1;
    this.setState({ countryIndex: newIndex }, () => {
      this.canvas.updateCanvas()
    })
  }

  /* navigates to the next country in the array of countries */
  next() {
    let newIndex = this.state.countryIndex === 9 ? 0 : this.state.countryIndex + 1;
    this.setState({ countryIndex: newIndex }, () => {
      this.canvas.updateCanvas()
    })
  }

  /* opens modal with country description */
  toggleDescription() {
    this.setState({ showDescription: !this.state.showDescription })
  }

  /* changes opacity for info btn */
  mouseOver() {
    this.setState({ opacity: 1 })
  }
  
  /* changes opacity for info btn */
  mouseLeave() {
    this.setState({ opacity: 0.25 })
  }

  render() {
    return (
      <Container fluid >
        
        <Row className="justify-content-md-center">
          <Col md="10">
            {/* element with canvas, image, info-button and modal with description */}
            <div className="content-container" onMouseOver={ this.mouseOver } onMouseLeave={ this.mouseLeave }>
              {/* modal with description */}
              <InfoModal isOpen={ this.state.showDescription } 
                   toggle={ this.toggleDescription } 
                   description={ db.countries[this.state.countryIndex].description }/>

              {/* component with canvas */}
              <CanvasComponent ref={instance => { this.canvas = instance; }} />

              {/* country's image */}
              <img src={ require('../../img/' + db.countries[this.state.countryIndex].image) } 
                   alt={ db.countries[this.state.countryIndex].image }
                   className="image rounded" />

              {/* button to toggle modal with description */}
              <Button style={{opacity: this.state.opacity}} 
                      className="btn-show-info" size="lg" 
                      onClick={ this.toggleDescription }></Button>
            </div>
          </Col>
          
        </Row>
        <Row className="justify-content-center">

          {/* button that navigates to the previous country in the array of countries */}
          <Col md="1" className="col-auto">
            <Button color="info" size="lg" onClick={ this.previous }>&lt;</Button>
          </Col>

          {/* name of the country */}
          <Col md="8" className="col-auto">
            <h6 className="vertical-center text-center font-weight-bold">{ db.countries[this.state.countryIndex].name }</h6>
          </Col>

          {/* button that navigates to the next country in the array of countries */}
          <Col md="1" className="col-auto">
            <Button className="float-right" color="info" size="lg" onClick={ this.next }>&gt;</Button>
          </Col>
        </Row>
      </Container>
         
    );
  }
}