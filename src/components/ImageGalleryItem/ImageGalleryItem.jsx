// import PropTypes from 'prop-types'
import { ImageGalleryItemImage, ImageGalleryItemStyle } from './ImageGalleryItem.styled'

function ImageGalleryItem({ data }) {
  const { webformatURL, largeImageURL, tags } = data
  return (
  <ImageGalleryItemStyle>
      <ImageGalleryItemImage src={webformatURL} alt={tags } />
    </ImageGalleryItemStyle>
  )
}

// ImageGalleryItem.propTypes = {
//   data: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     webformatURL: PropTypes.string,
//     largeImageURL: PropTypes.string,
//     tags: PropTypes.string.isRequired,
//   })
// }

export default ImageGalleryItem
