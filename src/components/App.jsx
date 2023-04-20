import { Component } from 'react'
import ImageGallery from './ImageGallery'
import Searchbar from './Searchbar'

export class App extends Component {
  render() {
    return (
      <>
        <Searchbar />
        <ImageGallery/>
      </>
    )
  }
}

