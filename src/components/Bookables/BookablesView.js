import React, { useState } from 'react';
import BookablesList from './BookablesList';
import BookableDetails from './BookableDetails';

export default function BookablesView() {
  const [bookable, setBookable] = useState();
  return (
    <>
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <BookableDetails bookable={bookable} />
    </>
  );
}
