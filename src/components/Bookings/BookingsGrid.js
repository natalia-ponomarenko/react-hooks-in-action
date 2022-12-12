import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { getGrid, transformBookings } from './grid-builder';
import { getBookings } from '../../utils/api';
import Spinner from '../../UI/Spinner';

export default function BookingsGrid({ week, bookable, booking, setBooking }) {
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState(false);
  console.log(booking)

  const { grid, sessions, dates } = useMemo(
    () => (bookable ? getGrid(bookable, week.start) : {}),
    [bookable, week.start]
  );

  useEffect(() => {
    if (bookable) {
      let doUpdate = true;
      setBookings(null);
      setError(false);
      setBooking(null);
      getBookings(bookable.id, week.start, week.end)
        .then((resp) => {
          if (doUpdate) {
            setBookings(transformBookings(resp));
          }
        })
        .catch(setError);
      return () => { doUpdate = false };
    }
    return undefined;
  }, [week, bookable, setBooking]);

  function cell(session, date) {
    const cellData = bookings?.[session]?.[date] || grid[session][date];
    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        role="presentation"
        key={date}
        className={isSelected ? 'selected' : null}
        onClick={bookings ? () => setBooking(cellData) : null}
      >
        {cellData.title}
      </td>
    );
  }

  if (!grid) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {error && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error})`}
        </p>
      )}
      <table
        role="presentation"
        className={bookings ? 'bookingsGrid active' : 'bookingsGrid'}
      >
        <thead>
          <tr>
            <th>
              <span className="status">
                <Spinner />
              </span>
            </th>
            {dates.map((d) => (
              <th key={d}>{new Date(d).toDateString()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session}>
              <th>{session}</th>
              {dates.map((date) => cell(session, date))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

BookingsGrid.propTypes = {
  week: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  bookable: PropTypes.shape({
    id: PropTypes.number,
    group: PropTypes.string,
    title: PropTypes.string,
    notes: PropTypes.string,
    days: PropTypes.arrayOf(PropTypes.number),
    sessions: PropTypes.arrayOf(PropTypes.number),
  }),
  booking: PropTypes.shape({
    session: PropTypes.string,
    date: PropTypes.string,
    bookableId: PropTypes.number,
    title: PropTypes.string,
  }),
  setBooking: PropTypes.func.isRequired,
};

BookingsGrid.defaultProps = {
  bookable: null,
  booking: null,
};
