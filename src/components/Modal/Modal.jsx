import { Component } from 'react'
import { createPortal } from "react-dom"
import { ModalStyle, Overlay } from "./Modal.styled"

const modalRoot = document.querySelector('#modal-root')





export default class Modal extends Component {

  componentDidMount() { 
    window.addEventListener('keydown', this.handleKeyDown)
   }

  componentWillUnmount() {
    window.removeEventListener('keydown',this.handleKeyDown)
  }
  
  handleKeyDown = e => {
      if (e.code === 'Escape') {
        this.props.onClose();
      }
    }
  

  render() {
    const {children} = this.props
    return createPortal(
    <Overlay>
      <ModalStyle>
        {children}
      </ModalStyle>
    </Overlay>,
    modalRoot
  )
  }
}

