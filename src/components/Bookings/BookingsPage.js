import React from 'react';
import { useQuery } from 'react-query';
import { shortISO } from '../../utils/date-wrangler';
import { useBookingsParams } from './bookingsHooks';
import BookablesList from '../Bookables/BookablesList';
import Bookings from './Bookings';
import getData from '../../utils/api';

export default function BookingsPage() {
  const {data: bookables = []} = useQuery(
    "bookables",
    () => getData("http://localhost:3001/bookables"),
    {
    suspense: true
    }
    );

  const { date, bookableId } = useBookingsParams();
  const bookable =
    bookables.find((bookableItem) => bookableItem.id === bookableId) ||
    bookables[0];

  const getUrl = (id) => {
    const root = `/bookings?bookableId=${id}`;
    return date ? `${root}&date=${shortISO(date)}` : root;
  };

  return (
    <main className="bookings-page">
      <BookablesList
        bookable={bookable}
        bookables={bookables}
        getUrl={getUrl}
      />
      <Bookings bookable={bookable} />
    </main>
  );
}
