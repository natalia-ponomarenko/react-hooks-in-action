/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import { FaArrowRight } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function BookablesList({ bookable, bookables, getUrl }) {
  const group = bookable?.group;
  const bookablesInGroup = bookables.filter(
    (bookableItem) => bookableItem.group === group
  );
  const groups = [
    ...new Set(bookables.map((bookableItem) => bookableItem.group)),
  ];

  const navigate = useNavigate();

  function changeGroup(event) {
    const bookablesInSelectedGroup = bookables.filter(
      (bookableItem) => bookableItem.group === event.target.value
    );
    navigate(getUrl(bookablesInSelectedGroup[0].id));
  }

  function nextBookable() {
    const index = bookablesInGroup.indexOf(bookable);
    const nextIndex = (index + 1) % bookablesInGroup.length;
    const nextBookableItem = bookablesInGroup[nextIndex];
    navigate(getUrl(nextBookableItem.id));
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
            <Link
              to={getUrl(bookableItem.id)}
              className="btn"
              replace
            >
              {bookableItem.title}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <button
          className="btn"
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
  bookables: PropTypes.arrayOf({
    id: PropTypes.number,
    group: PropTypes.string,
    title: PropTypes.string,
    notes: PropTypes.string,
    days: PropTypes.arrayOf(PropTypes.number),
    sessions: PropTypes.arrayOf(PropTypes.number),
  }),
  getUrl: PropTypes.func.isRequired,
};

BookablesList.defaultProps = {
  bookable: null,
  bookables: [],
};
