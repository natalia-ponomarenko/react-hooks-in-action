import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Spinner from '../../UI/Spinner';
import { useBookings, useGrid } from './bookingsHooks';

export default function BookingsGrid({ week, bookable, booking, setBooking }) {
  const { bookings, status, error } = useBookings(
    bookable?.id,
    week.start,
    week.end
  );

  const { grid, sessions, dates } = useGrid(bookable, week.start);
  
  useEffect(() => {
    setBooking(null);
  }, [bookable, week.start, setBooking]);

  function cell(session, date) {
    const cellData = bookings?.[session]?.[date] || grid[session][date];
    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        role="presentation"
        key={date}
        className={isSelected ? 'selected' : null}
        onClick={ status === "success" ? () => setBooking(cellData) : null}
      >
        {cellData.title}
      </td>
    );
  }

  if (!grid) {
    return <p>Waiting for bookable and week details...</p>;
  }

  return (
    <>
      {status === "error" && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error})`}
        </p>
      )}
      <table
        role="presentation"
        className={status === "success" ? 'bookingsGrid active' : 'bookingsGrid'}
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
