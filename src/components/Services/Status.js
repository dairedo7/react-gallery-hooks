import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Loader } from '../Loader/Loader';
export default function Status({ status }) {
  const [message, setMessage] = useState('');
  console.log(status);
  const getMessage = () => {
    if (status === 'idle') {
      setMessage('Start typing to find pictures...');
    }
    if (status === 'pending') {
      setMessage(<Loader />);
    }
    if (status === 'resolved') {
      setMessage('No results found for this request!');
    }
    return message;
  };

  return <h2 className="welcome__message">{message}</h2>;
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
};
