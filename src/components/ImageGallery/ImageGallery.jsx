import axios from 'axios';
import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify';
import { ImageGalleryStyle, Wrapper } from './ImageGallery.styled';

const KEY = '29559865-360b254a5abc6663dbbd46c59'

export default class ImageGallery extends Component { 
  state = {
    data: null,
    totalHits: null,
    error: null,
    status: 'idle'
  }

  componentDidUpdate(prevProps, prevState) { 
    const prevReq = prevProps.search
    const newReq = this.props.search

    if (prevReq !== newReq) {
      const URL = `https://pixabay.com/api/?q=${newReq}}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`

      this.setState({status: 'pending'})

        axios
        .get(URL)
          .then(data => { 
            if (data.data.totalHits === 0) {
              toast.error(`There is no images with "${newReq}" tags.`)
              this.setState({ data: [], status: "idle"})
            } else {
            this.setState({ data: data.data.hits, totalHits: data.data.totalHits, status: 'resolved' })
            }
            
          })
        .catch(err => {
          console.log(err)
          this.setState({ error: err.message, status: 'rejected'})
          toast.error(`${this.state.error}`)
        })

    }
  } 

  render() {
    const { data, totalHits, status, error } = this.state

    if (status === 'idle') {
      return (
        <Wrapper>
          <h1>Describe the images you want to see!</h1>
        </Wrapper>

      )
    }

    if (status === 'pending') {
      return (
        <ThreeDots 
          height="80" 
          width="80" 
          radius="9"
          color="#3f51b5" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
          wrapperClassName=""
          visible={true}
          />
      )   
    }

    if (status === 'rejected') {
      toast.error(`${error.message}`)
        return (<ToastContainer autoClose={3000}/>)
    }

    if (status === 'resolved') {
      return (
      <Wrapper>
        <ImageGalleryStyle>
        {data.map((hit) => {
        return (
          <ImageGalleryItem key={hit.id} data={hit}/>
        )
        })}
        </ImageGalleryStyle>
        {Number(totalHits) > 12 && <Button/>}
    </Wrapper>
    )
    }
  }
}



ImageGallery.propTypes = {
  search: PropTypes.string.isRequired
}