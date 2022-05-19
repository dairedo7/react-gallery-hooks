import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal__root');

export function Modal({ onClose, largeImageURL }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleClick}>
      <div className={styles.modal}>
        <img className={styles.img} src={largeImageURL} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
