import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaEdit } from 'react-icons/fa';
import Booking from './Booking';
import UserContext from '../Users/UserContext';

export default function BookingDetails({ booking, bookable }) {
  const {user} = useContext(UserContext);
  const isBooker = booking && user && booking.bookerId === user.id;
  console.log(booking)
  return (
    <div className="booking-details">
      <h2>
        Booking Details
        {isBooker && (
          <span className="controls">
            <button type="submit" className="btn">
              <FaEdit />
            </button>
          </span>
        )}
      </h2>
      {booking ? (
        <Booking booking={booking} bookable={bookable} />
      ) : (
        <div className="booking-details-fields">
          <p>Select a booking or a booking slot.</p>
        </div>
      )}
    </div>
  );
}

BookingDetails.propTypes = {
  booking: PropTypes.shape({
    session: PropTypes.string,
    date: PropTypes.string,
    bookableId: PropTypes.number,
    title: PropTypes.string,
    bookerId: PropTypes.string,
  }),
  bookable: PropTypes.shape({
    id: PropTypes.number,
    group: PropTypes.string,
    title: PropTypes.string,
    notes: PropTypes.string,
    days: PropTypes.arrayOf(PropTypes.number),
    sessions: PropTypes.arrayOf(PropTypes.number),
  }),
};

BookingDetails.defaultProps = {
  bookable: null,
  booking: null,
};
