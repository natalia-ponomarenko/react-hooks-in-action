import React from 'react';
import PropTypes from 'prop-types';

export default function BookingsGrid(props) {
  const { week, bookable, booking, setBooking } = props;
  return (
    <div className="bookings-grid placeholder">
      <h3>Bookings Grid</h3>
      <p>{bookable?.title}</p>
      <p>{week.date.toISOString()}</p>
    </div>
  );
}

BookingsGrid.propTypes = {
  week: PropTypes.instanceOf(Date).isRequired,
  bookable: PropTypes.shape({
    id: PropTypes.number,
    group: PropTypes.string,
    title: PropTypes.string,
    notes: PropTypes.string,
    days: PropTypes.arrayOf(PropTypes.number),
    sessions: PropTypes.arrayOf(PropTypes.number),
  }),
  booking: PropTypes.string.isRequired,
  setBooking: PropTypes.func.isRequired,
}

BookingsGrid.defaultProps = {
  bookable: null,
};

