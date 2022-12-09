import { sessions as sessionNames } from '../../static.json';
import { addDays, shortISO } from '../../utils/date-wrangler';

export default function getGrid(bookable, startDate) {
  const dates = bookable.days
    .sort()
    .map((day) => shortISO(addDays(startDate, day)));
  const sessions = bookable.sessions.map((i) => sessionNames[i]);
  const grid = {};
  sessions.forEach((session) => {
    grid[session] = {};
    dates.forEach(
      (date) =>
        (grid[session][date] = {
          session,
          date,
          bookableId: bookable.id,
          title: '',
        })
    );
  });
  return {
    grid,
    dates,
    sessions,
  };
}

export function transformBookings(bookingsArray) {
  return bookingsArray.reduce((bookings, booking) => {
    const { session, date } = booking;
    if (!bookings[session]) {
      bookings[session] = {};
    }
    bookings[session][date] = booking;
    return bookings;
  }, {});
}
