// import PropTypes from 'prop-types'

function Button({onLoadMore}) {
  return (
    <button type='button' onClick={onLoadMore}>Load more</button>
  )
}

Button.propTypes = {
  onLoadMore: PropTypes.func
}

export default Button
