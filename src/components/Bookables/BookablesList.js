/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Spinner from '../../UI/Spinner';
import useFetch from '../../utils/useFetch';

export default function BookablesList({ bookable, setBookable }) {
  const {
    data: bookables = [],
    status,
    error,
  } = useFetch('http://localhost:3001/bookables');

  const group = bookable?.group;
  const bookablesInGroup = bookables.filter(
    (bookableItem) => bookableItem.group === group
  );
  const groups = [
    ...new Set(bookables.map((bookableItem) => bookableItem.group)),
  ];

  useEffect(() => {
    setBookable(bookables[0]);
  }, [bookables, setBookable]);

  function changeGroup(event) {
    const bookablesInSelectedGroup = bookables.filter(
      (bookableItem) => bookableItem.group === event.target.value
    );
    setBookable(bookablesInSelectedGroup[0]);
  }

  function changeBookable(selectedBookable) {
    setBookable(selectedBookable);
  }

  function nextBookable() {
    const index = bookablesInGroup.indexOf(bookable);
    const nextIndex = (index + 1) % bookablesInGroup.length;
    const nextBookableItem = bookablesInGroup[nextIndex];
    setBookable(nextBookableItem);
  }

  if (status === 'error') {
    return <p>{error.message}</p>;
  }
  if (status === 'loading') {
    return (
      <p>
        <Spinner /> Loading bookables...
      </p>
    );
  }

  return (
    <div>
      <select value={group} onChange={changeGroup}>
        {groups.map((groupName) => (
          <option value={groupName} key={groupName}>
            {groupName}
          </option>
        ))}
      </select>
      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((bookableItem) => (
          <li
            key={bookableItem.id}
            className={bookableItem.id === bookable.id ? 'selected' : null}
          >
            <button
              type="button"
              className="btn"
              onClick={() => changeBookable(bookableItem)}
            >
              {bookableItem.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button
          className="btn focuse-mode"
          type="button"
          onClick={nextBookable}
          autoFocus
        >
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}

BookablesList.propTypes = {
  bookable: PropTypes.shape({
    id: PropTypes.number,
    group: PropTypes.string,
    title: PropTypes.string,
    notes: PropTypes.string,
    days: PropTypes.arrayOf(PropTypes.number),
    sessions: PropTypes.arrayOf(PropTypes.number),
  }),
  setBookable: PropTypes.func.isRequired,
};

BookablesList.defaultProps = {
  bookable: null,
};
