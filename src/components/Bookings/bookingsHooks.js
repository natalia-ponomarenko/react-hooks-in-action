import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getGrid, transformBookings } from './grid-builder';
import useFetch from '../../utils/useFetch';
import { shortISO, isDate } from '../../utils/date-wrangler';

export function useBookings(bookableId, startDate, endDate) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);
  const urlRoot = 'http://localhost:3001/bookings';
  const queryString = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
  const query = useFetch(`${urlRoot}?${queryString}`);
  return {
    bookings: query.data ? transformBookings(query.data) : {},
    ...query,
  };
}

export function useGrid(bookable, startDate) {
  return useMemo(
    () => (bookable ? getGrid(bookable, startDate) : {}),
    [bookable, startDate]
  );
}

export function useBookingsParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const searchDate = searchParams.get('date');
  const bookableId = searchParams.get('bookableId');
  const date = isDate(searchDate) ? new Date(searchDate) : new Date();
  const idInt = parseInt(bookableId, 10);
  const hasId = !isNaN(idInt);

  function setBookingsDate(dateUsed) {
    const params = {};
    if (hasId) {
      params.bookableId = bookableId;
    }
    if (isDate(date)) {
      params.date = dateUsed;
    }
    if (params.date || params.bookableId !== undefined) {
      setSearchParams(params, { replace: true });
    }
  }

  return {
    date,
    bookableId: hasId ? idInt : undefined,
    setBookingsDate,
  };
}
