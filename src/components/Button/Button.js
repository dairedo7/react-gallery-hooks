import { PropTypes } from 'prop-types';
import styles from './Button.module.css';

export default function Button({ loadMorePictures }) {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });

  return (
    <button className={styles.Button} onClick={loadMorePictures}>
      Load more
    </button>
  );
}

Button.propTypes = {
  loadMorePictures: PropTypes.func.isRequired,
};
