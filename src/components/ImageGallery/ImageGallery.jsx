import axios from 'axios';
import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ImageGalleryStyle, Wrapper } from './ImageGallery.styled';


export default function ImageGallery({ search }) {
  const [prevSearch, setPrevSearch] = useState('');
  const [data, setData] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);

  useEffect(() => {
    if (prevSearch !== search) {
      setData([]);
      setPage(1);
      setStatus('pending');
      fetchImages();
    } else if (page !== 1) {
      setStatus('pending');
      fetchImages();
    }
    setPrevSearch(search);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const fetchImages = () => {
    const KEY = '29559865-360b254a5abc6663dbbd46c59';

    const URL = `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`;

    axios
      .get(URL)
      .then((response) => {
        const data = response.data;
        if (data.totalHits === 0) {
          toast.error(`There are no images with "${search}" tags.`);
          setStatus('idle');
          return data;
        } else {
          setData((prevData) => prevData.concat(data.hits));
          setTotalHits(data.totalHits);
          setStatus('resolved');
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setStatus('rejected');
        toast.error(`${error}`);
      });
  };

  function loadMore() {
    setStatus('pending')
    setPage(page + 1)
  }

  function isMorePages() {
    return page*per_page < totalHits
  }


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

          {isMorePages() && status !== 'pending' ?
            (<Button onLoadMore={loadMore} />) 
            : null
          }

          {!isMorePages() ?
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

ImageGallery.propTypes = {
  search: PropTypes.string.isRequired
}