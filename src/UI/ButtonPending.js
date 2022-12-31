import React, { useTransition } from 'react';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

export default function ButtonPending({ children, onClick }) {
  const [isPending, startTransition] = useTransition();
  function handleClick() {
    startTransition(onClick);
  }
  return (
    <button type="button" onClick={handleClick}>
      {isPending && <Spinner />}
      {children}
      {isPending && <Spinner />}
    </button>
  );
}

ButtonPending.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
