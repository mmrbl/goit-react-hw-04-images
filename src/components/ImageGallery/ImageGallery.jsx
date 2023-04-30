import axios from 'axios';
import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ImageGalleryStyle, Wrapper } from './ImageGallery.styled';



export default class ImageGallery extends Component {
  state = {
    data: [],
    totalHits: null,
    error: null,
    status: 'idle',
    page: 1,
    per_page: 12,
  }; 


  componentDidUpdate(prevProps, prevState) {
    const prevReq = prevProps.search;
    const search = this.props.search;

    if (prevReq !== search) {
      this.setState({data: [], page: 1, status: 'pending'});
      
      this.fetchImages()
    } else if (prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      
      this.fetchImages()
    }
  }

  fetchImages = () => {
    const KEY = '29559865-360b254a5abc6663dbbd46c59'
    const search = this.props.search;
    let { page, per_page } = this.state
    
      const URL = `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`;
    
    axios
      .get(URL)
      .then((data) => {
        if (data.data.totalHits === 0) {
          toast.error(`There is no images with "${search}" tags.`);
          this.setState({status: 'idle'})
          return data
        } else {
          this.setState((prevState) => ({
            data: prevState.data.concat(data.data.hits),
            totalHits: data.data.totalHits,
            status: 'resolved',
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err.message, status: 'rejected' });
        toast.error(`${this.state.error}`);
      })
      
      
  }
  
  loadMore = () => {
    this.setState((prevState) => ({
      status: 'pending',
      page: prevState.page + 1,

    }))
  }

  isMorePages = () => {
    const { totalHits, per_page, page } = this.state
    return page*per_page < totalHits
  }

  render() {
    const { data, status, error } = this.state;
    const isMorePages = this.isMorePages()

    if (status === 'idle') {
      return (
        <Wrapper>
          <h1>Describe the images you want to see!</h1>
        </Wrapper>
      );
    }

    if (status === 'rejected') {
      toast.error(`${error.message}`);
      return <ToastContainer autoClose={3000} />;
    }

    if (data.length > 0) { 
      return (
        <Wrapper>
          <ImageGalleryStyle>
            {data.map((hit) => {
              return <ImageGalleryItem key={hit.id} data={hit} />;
            })}
          </ImageGalleryStyle>

          {isMorePages && status !== 'pending' ?
            (<Button onLoadMore={this.loadMore} />) 
            : null
          }

          {!isMorePages ?
            (<p>No more images with your tags :c</p>)
          : (status === "pending" ? (<Loader/>) : null)
          }

        </Wrapper>
      );
    }
    
    if (status === 'pending') {
      return <Loader />;
    }
  }
}



ImageGallery.propTypes = {
  search: PropTypes.string.isRequired
}