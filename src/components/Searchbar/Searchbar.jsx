import PropTypes from 'prop-types';
import { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchbarStyle, SearchForm, SearchFormButton, SearchFormButtonLabel } from './Searchbar.styled';


export default class Searchbar extends Component {
  state = {
    searchItems: ''
  }

  onSubmitForm = e => {
    e.preventDefault()

    if (this.state.searchItems.trim().toLowerCase() === '') {
      toast.error('Describe the images you want to see!')
      return
    }

    this.props.handleSubmit(this.state.searchItems)
    this.setState({searchItems: ''})
  }

  onInputChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value})
  }

  render() {
    return (
<SearchbarStyle>
  <SearchForm htmlFor='searchItems' onSubmit={this.onSubmitForm}>
    <SearchFormButton type="submit" >
          <FiSearch/>
      <SearchFormButtonLabel>Search</SearchFormButtonLabel>
    </SearchFormButton>

    <input
      onChange={this.onInputChange}
      name='searchItems'
      value={this.state.searchItems}
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
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func
}





