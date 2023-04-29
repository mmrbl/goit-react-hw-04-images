
import PropTypes from 'prop-types'
import Modal from 'components/Modal'
import { Component } from 'react'
import { ImageGalleryItemImage, ImageGalleryItemStyle } from './ImageGalleryItem.styled'

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  }

  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
    }))
  }


  render() {
    const { webformatURL, largeImageURL, tags } = this.props.data
    const {showModal} = this.state
    return (
      <>
        {showModal &&
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} onClick={this.toggleModal} />
          </Modal>}
        
        <ImageGalleryItemStyle>
          <ImageGalleryItemImage src={webformatURL} alt={tags} onClick={this.toggleModal} />
        </ImageGalleryItemStyle>
      </>

      
    )
  }
}


ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string.isRequired,
  })
}