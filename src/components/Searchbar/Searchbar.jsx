import PropTypes from 'prop-types';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchbarStyle, SearchForm, SearchFormButton, SearchFormButtonLabel } from './Searchbar.styled';



export default function Searchbar({handleSubmit}) {
  const [searchItems, setSearchItems] = useState('')

  function onSubmitForm(e) {
    e.preventDefault()

    if (searchItems.trim().toLowerCase() === '') {
      toast.error('Describe the images you want to see!')
      return
    }

    handleSubmit(searchItems)
    setSearchItems('')
  }

function onInputChange(e) {
  setSearchItems(e.target.value)
}


  return (
    <SearchbarStyle>
    <SearchForm htmlFor='searchItems' onSubmit={onSubmitForm}>
    <SearchFormButton type="submit" >
          <FiSearch/>
      <SearchFormButtonLabel>Search</SearchFormButtonLabel>
    </SearchFormButton>

    <input
      onChange={onInputChange}
      name='searchItems'
      value={searchItems}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
        </SearchForm>
      <ToastContainer autoClose={3000}/>
      </SearchbarStyle>
      
      
    )
}



Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}
