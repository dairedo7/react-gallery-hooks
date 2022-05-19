import styles from './ImageGallery.module.css';
import { PropTypes } from 'prop-types';

export const ImageGallery = ({ children }) => {
  return (
    <div className={styles.gallery_container}>
      <ul className={styles.gallery}>{children}</ul>
    </div>
  );
};

ImageGallery.propTypes = {
  children: PropTypes.object.isRequired,
};
