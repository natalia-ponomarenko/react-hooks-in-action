/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Spinner from '../../UI/Spinner';
import getData from '../../utils/api';

export default function BookablesList({ state, dispatch }) {
  const { group, bookableIndex, bookables, isLoading, error } = state;

  const bookablesInGroup = bookables.filter(
    (bookable) => bookable.group === group
  );
  const groups = [
    ...new Set(bookables.map((bookableItem) => bookableItem.group)),
  ];

  const nextButtonRef = useRef();

  useEffect(() => {
    dispatch({ type: 'FETCH_BOOKABLES_REQUEST' });
    getData('http://localhost:3001/bookables')
      .then((listOfBookables) =>
        dispatch({
          type: 'FETCH_BOOKABLES_SUCCESS',
          payload: listOfBookables,
        })
      )
      .catch((errorMessage) =>
        dispatch({
          type: 'FETCH_BOOKABLES_ERROR',
          payload: errorMessage,
        })
      );
  }, [dispatch]);

  function changeGroup(e) {
    dispatch({
      type: 'SET_GROUP',
      payload: e.target.value,
    });
  }

  function nextBookable() {
    dispatch({
      type: 'NEXT_BOOKABLE',
    });
  }

  function changeBookable(selectedIndex) {
    dispatch({
      type: 'SET_BOOKABLE',
      payload: selectedIndex,
    });
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  if (isLoading) {
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
        {bookablesInGroup.map((bookableItem, i) => (
          <li
            key={bookableItem.id}
            className={i === bookableIndex ? 'selected' : null}
          >
            <button
              type="button"
              className="btn"
              onClick={() => changeBookable(i)}
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
          ref={nextButtonRef}
          autoFocus
        >
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}

// use appropriate prop types!!

BookablesList.propTypes = {
  state: PropTypes.instanceOf(Date).isRequired,
  dispatch: PropTypes.func.isRequired,
};
