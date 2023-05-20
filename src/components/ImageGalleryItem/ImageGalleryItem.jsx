import Modal from 'components/Modal'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { ImageGalleryItemImage, ImageGalleryItemStyle } from './ImageGalleryItem.styled'



export default function ImageGalleryItem({ data }) {
  const { webformatURL, largeImageURL, tags } = data

  const [showModal, setShowModal] = useState(false)

  function toggleModal() {
    setShowModal(!showModal)
  }



  return (
      <>
        {showModal &&
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={tags} onClick={toggleModal} />
          </Modal>}
        
        <ImageGalleryItemStyle>
          <ImageGalleryItemImage src={webformatURL} alt={tags} onClick={toggleModal} />
        </ImageGalleryItemStyle>
      </>

      
    )
}

ImageGalleryItem.propTypes = {
  data: PropTypes.object.isRequired
}