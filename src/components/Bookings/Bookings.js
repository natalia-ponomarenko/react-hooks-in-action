import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getWeek, shortISO } from '../../utils/date-wrangler';
import { useBookingsParams, useBookings } from './bookingsHooks';
import WeekPicker from './WeekPicker';
import BookingsGrid from './BookingsGrid';
import BookingDetails from './BookingDetails';

export default function Bookings({ bookable }) {
  const [booking, setBooking] = useState(null);
  
  const { date } = useBookingsParams();
  const week = getWeek(date);
  const weekStart = shortISO(week.start);

  const { bookings } = useBookings(bookable?.id, week.start, week.end);
  const selectedBooking = bookings?.[booking?.session]?.[booking.date];

  useEffect(() => {
    setBooking(null);
  }, [bookable, weekStart]);

  return (
    <div className="bookings">
      <div>
        <WeekPicker />
        <BookingsGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>
      <BookingDetails
        booking={selectedBooking || booking}
        bookable={bookable}
      />
    </div>
  );
}

Bookings.propTypes = {
  bookable: PropTypes.shape({
    id: PropTypes.number,
    group: PropTypes.string,
    title: PropTypes.string,
    notes: PropTypes.string,
    days: PropTypes.arrayOf(PropTypes.number),
    sessions: PropTypes.arrayOf(PropTypes.number),
  }),
};

Bookings.defaultProps = {
  bookable: null,
};
