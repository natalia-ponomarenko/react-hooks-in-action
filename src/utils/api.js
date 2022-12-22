import { shortISO } from './date-wrangler';

export default function getData(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw Error('There was a problem fetching data.');
    }
    return response.json();
  });
}

export function getBookings(bookableId, startDate, endDate) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);
  const urlRoot = 'http://localhost:3001/bookings';
  const query =
    `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
  return getData(`${urlRoot}?${query}`);
}

export function createItem (url, item) {
  return fetch(
    url,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(item)
    }
  ).then(result => {
    if (!result.ok) {
      throw new Error("There was a problem creating the item!");
    }
    return result.json();
  });
}


export function editItem (url, item) {
  return fetch(
    url,
    {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(item)
    }
  ).then(result => {
    if (!result.ok) {
      throw new Error("There was a problem editing the item!");
    }
    return result.json();
  });
}

export function deleteItem (url) {
  return fetch(
    url,
    {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
    }
  ).then(result => {
    if (!result.ok) {
      throw new Error("There was a problem editing the item!");
    }
    return result.json();
  });
}


