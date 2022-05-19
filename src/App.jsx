import { useEffect, useState } from 'react';
import './index.css';
import { Searchbar } from './components/Searchbar/Searchbar.js';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import fetchPicturesWithQuery from './components/Services/API.js';
import markup from './components/Services/renderMarkup';

// import Status from 'components/Services/Status';

export function App() {
  const [pictures, setPictures] = useState([]);
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(0);
  const [showModal, setModal] = useState(false);
  const [error, setErrorMessage] = useState('');
  const [visibleButton, setVisibleButton] = useState(false);
  const [modalItem, setModalItem] = useState([]);

  useEffect(() => {
    if (value === null) {
      return;
    }
    setVisibleButton(false);
    handleRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, page]);

  const updateQuery = text => {
    if (value === text) {
      return;
    }
    setValue(text);
    setPage(1);
    setPictures([]);
    setVisibleButton(true);
  };
  const handleAddPage = () => {
    setPage(page + 1);
  };
  const handleRequest = async () => {
    setStatus('pending');

    try {
      const pictures = await fetchPicturesWithQuery(value, page);
      const { hits, totalHits } = pictures;

      const renderPictures = markup(hits);
      if (totalHits - 12 <= 0) {
        setVisibleButton(false);
      } else {
        setVisibleButton(true);
      }
      setPictures(prevState => [...prevState, ...renderPictures]);

      setStatus('resolved');
    } catch (error) {
      setErrorMessage(error);
      setStatus('rejected');
    }
  };

  const addModalWindow = id => {
    const findId = pictures.find(item => item.id === id);

    setModalItem(findId.largeImageURL);
    toggleModal();
  };

  const toggleModal = () => {
    setModal(!showModal);
  };

  return (
    <>
      {showModal && <Modal largeImageURL={modalItem} onClose={toggleModal} />}

      <Searchbar submit={updateQuery} />

      <ImageGallery>
        <ImageGalleryItem pictures={pictures} modal={addModalWindow} />
      </ImageGallery>

      {/* <Status status={status} /> */}
      {status === 'idle' && (
        <h2 className="welcome__message">Start typing to find pictures...</h2>
      )}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && pictures.length === 0 && (
        <h2 className="error__message">
          No results found for '{value}' request!
        </h2>
      )}

      {status === 'resolved' && visibleButton && (
        <Button loadMorePictures={handleAddPage} />
      )}
    </>
  );
}
