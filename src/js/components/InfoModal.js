import React, { Component } from 'react'
import { Modal, ModalBody } from 'reactstrap'

/* Modal that displays text, that he received from parent */
export default class InfoModal extends Component {

  render() {
    return (
      <Modal isOpen={ this.props.isOpen } toggle={ this.props.toggle } size="sm" className="info-modal">
        <ModalBody>  
          { this.props.description }
        </ModalBody>
      </Modal>
    )
  }
}