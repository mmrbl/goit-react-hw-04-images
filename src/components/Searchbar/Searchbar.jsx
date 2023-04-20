import PropTypes from 'prop-types'
import { FiSearch } from 'react-icons/fi'
import { SearchbarStyle, SearchForm, SearchFormButton, SearchFormButtonLabel } from './Searchbar.styled'

function Searchbar({onSubmit}) {
  return (
    <SearchbarStyle>
  <SearchForm>
    <SearchFormButton type="submit">
          <FiSearch/>
      <SearchFormButtonLabel>Search</SearchFormButtonLabel>
    </SearchFormButton>

    <input
      class="input"
      type="text"
      autocomplete="off"
      autofocus
      placeholder="Search images and photos"
    />
  </SearchForm>
</SearchbarStyle>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func
}

export default Searchbar