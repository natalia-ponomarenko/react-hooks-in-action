export default function getData(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw Error('There was a problem fetching data.');
    }
    return response.json();
  });
}
