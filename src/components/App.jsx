
import { Component } from 'react';

import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';




// idle
// pending
// resolved
// rejected

export class App extends Component {
  state = {
    search: ''
  }

  handleSubmitForm = (search) => {
    this.setState({search})
  }


  render() {
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmitForm}/>
        <ImageGallery search={this.state.search.trim().toLowerCase()}/>

      </>
    )
  }
}

