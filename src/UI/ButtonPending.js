import React, { useTransition } from 'react';
import Spinner from './Spinner';

export default function ButtonPending({ children, onClick, ...props }) {
  const [isPending, startTransition] = useTransition();
  function handleClick() {
    startTransition(onClick);
  }
  return (
    <button type="button" onClick={handleClick} {...props}>
      {isPending && <Spinner />}
      {children}
      {isPending && <Spinner />}
    </button>
  );
}
