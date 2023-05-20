
import { useState } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';




export function App() {
  const [search, setSearch] = useState('')

  function handleSubmitForm(search) {
    setSearch(search)
  }

  return (
      <>
        <Searchbar handleSubmit={handleSubmitForm}/>
        <ImageGallery search={search.trim().toLowerCase()}/>

      </>
    )
}

export default App





