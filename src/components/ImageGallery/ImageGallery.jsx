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

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
      status: 'pending'
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    const KEY = '29559865-360b254a5abc6663dbbd46c59'
    const prevReq = prevProps.search;
    const newReq = this.props.search;
    let { page, per_page } = this.state

    if (prevReq !== newReq || prevState.page !== page) {
      this.setState({status: 'pending'});
      
      const URL = `https://pixabay.com/api/?q=${newReq}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`;

      
   
      axios
      .get(URL)
      .then((data) => {
        if (data.data.totalHits === 0) {
          toast.error(`There is no images with "${newReq}" tags.`);
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
  }

  

  render() {
    const { data, totalHits, status, error, per_page } = this.state;

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

           {Number(totalHits) > per_page && status !== 'pending'? (
            <Button onLoadMore={this.loadMore} />
          ) : <Loader/>}

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