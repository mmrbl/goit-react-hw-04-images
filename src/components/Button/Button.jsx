import PropTypes from 'prop-types'
import { ButtonStyle } from "./Button.styled"

function Button({onLoadMore}) {
  return (
    <ButtonStyle type='button' onClick={onLoadMore}>Load more</ButtonStyle>
  )
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired
}

export default Button
