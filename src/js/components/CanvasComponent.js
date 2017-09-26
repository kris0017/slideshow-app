import React, { Component } from 'react'
import { randomHexColor } from '../helpers'

/* Canvas that updated gradient with random colors */
export default class CanvasComponent extends Component {
  constructor() {
    super();

    this.updateCanvas = this.updateCanvas.bind(this);
  }

  componentDidMount() {
    this.updateCanvas()
  }

  updateCanvas() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Create gradient
    var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, randomHexColor());
    grd.addColorStop(1, randomHexColor());

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  render() {
    return <canvas ref="canvas" className="canvas"></canvas>
  }
}