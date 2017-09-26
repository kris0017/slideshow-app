import React, { Component } from 'react'
import { Modal, ModalBody } from 'reactstrap'

export default class InfoModal extends Component {

  render() {
    const { isOpen, toggle } = this.props;
    return (
      <Modal isOpen={ isOpen } toggle={ toggle } size="sm" className="info-modal">
        <ModalBody>  
          { this.props.description }
        </ModalBody>
      </Modal>
    )
  }
}