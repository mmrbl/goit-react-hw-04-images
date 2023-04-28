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

    if (prevReq !== newReq || prevState.page !== this.state.page) {
      const URL = `https://pixabay.com/api/?q=${newReq}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ status: 'pending' });
    setTimeout(() => { 
      axios
      .get(URL)
      .then((data) => {
        if (data.data.totalHits === 0) {
          toast.error(`There is no images with "${newReq}" tags.`);
          this.setState({ data: [], status: 'idle' });
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
     }, 1000)
    }
  }

  

  render() {
    const { data, totalHits, status, error } = this.state;

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

    if (status === 'resolved') {
      return (
        <Wrapper>
          <ImageGalleryStyle>
            {data.map((hit) => {
              return <ImageGalleryItem key={hit.id} data={hit} />;
            })}
          </ImageGalleryStyle>
          {Number(totalHits) > 12 && (
            <Button onLoadMore={this.loadMore} />
          )}
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