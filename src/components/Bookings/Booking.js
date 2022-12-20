import React from 'react';
import PropTypes from 'prop-types';

export default function Booking({ booking, bookable }) {
  const { title, date, session, notes } = booking;

  return (
    <div className="booking-details-fields">
      <div>Title</div>
      <p>{title}</p>
      <div>Bookable</div>
      <p>{bookable.title}</p>
      <div>Booking Date</div>
      <p>{new Date(date).toDateString()}</p>
      <div>Session</div>
      <p>{session}</p>
      {notes && (
        <>
          <div>Notes</div>
          <p>{notes}</p>
        </>
      )}
    </div>
  );
}

Booking.propTypes = {
  booking: PropTypes.shape({
    session: PropTypes.string,
    date: PropTypes.string,
    bookableId: PropTypes.number,
    title: PropTypes.string,
    notes: PropTypes.string,
  }),
  bookable: PropTypes.shape({
    id: PropTypes.number,
    group: PropTypes.string,
    title: PropTypes.string,
    days: PropTypes.arrayOf(PropTypes.number),
    sessions: PropTypes.arrayOf(PropTypes.number),
  }),
}

Booking.defaultProps = {
  bookable: null,
  booking: null,
};

