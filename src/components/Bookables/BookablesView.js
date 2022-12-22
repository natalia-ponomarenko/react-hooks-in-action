import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useQuery } from 'react-query';
import BookablesList from './BookablesList';
import BookableDetails from './BookableDetails';
import PageSpinner from '../../UI/PageSpinner';
import getData from '../../utils/api';

export default function BookablesView() {
  const {
    data: bookables = [],
    status,
    error,
  } = useQuery('bookables', () => getData('http://localhost:3001/bookables'));

  const { id } = useParams();

  const bookable =
    bookables.find((b) => b.id === parseInt(id, 10)) || bookables[0];

  if (status === 'error') {
    return <p>{error.message}</p>;
  }

  if (status === 'loading') {
    return <PageSpinner />;
  }

  return (
    <main className="bookables-page">
      <div>
        <BookablesList
          bookable={bookable}
          bookables={bookables}
          getUrl={(bookableId) => `/bookables/${bookableId}`}
        />
        <p className="controls">
          <Link to="/bookables/new" replace className="btn">
            <FaPlus />
            <span>New</span>
          </Link>
        </p>
      </div>
      <BookableDetails bookable={bookable} />
    </main>
  );
}
