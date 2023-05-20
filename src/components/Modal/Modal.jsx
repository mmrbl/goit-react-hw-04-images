import { useEffect } from 'react';
import { createPortal } from "react-dom";
import { ModalStyle, Overlay } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root')



export default function Modal({ children, onClose }) {
  
  useEffect(() => {
    
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    
    return  () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    
  }, []);
  
  
  return createPortal(
    <Overlay>
      <ModalStyle>
        {children}
      </ModalStyle>
    </Overlay>,
    modalRoot
  )
}
