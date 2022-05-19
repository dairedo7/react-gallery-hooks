import styles from './Searchbar.module.css';
import { useState } from 'react';
import { Notify } from 'notiflix';
import { PropTypes } from 'prop-types';

export function Searchbar({ submit }) {
  const [input, setInput] = useState('');

  const reset = () => {
    setInput('');
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (input.trim() === '') {
      return Notify.warning('Request field cannot be empty');
    }
    submit(input);
    reset();
  };

  const onInputChange = ({ target }) => {
    const { value } = target;

    setInput(value.toLowerCase());
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button className={styles.SearchForm_button} type="submit">
          Find
          <span className={styles.SearchForm_button_label} type="submit">
            Search
          </span>
        </button>
        <label className={styles.SearchForm_button_label}></label>
        <input
          className={styles.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          onChange={onInputChange}
          value={input}
          placeholder="Search images and photos..."
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  submit: PropTypes.func.isRequired,
};
