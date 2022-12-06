import React, { useReducer, useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { sessions, days } from '../../static.json';
// import data from '../../static.json';
// get data.sessions and data.days
import reducer from './reducer';
import Spinner from '../../UI/Spinner';
import getData from '../../utils/api';

const initialState = {
  group: 'Rooms',
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: false,
};

export default function BookablesList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { group, bookableIndex, bookables, hasDetails, isLoading, error } =
    state;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const bookable = bookablesInGroup[bookableIndex];
  const groups = [
    ...new Set(bookables.map((bookableItem) => bookableItem.group)),
  ];
  const timerRef = useRef(null);
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
  }, []);

  function stopPresentation() {
    clearInterval(timerRef.current);
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      dispatch({ type: 'NEXT_BOOKABLE' });
    }, 3000);
    return stopPresentation;
  }, []);

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
    nextButtonRef.current.focus();
  }

  function toggleDetails() {
    dispatch({ type: 'TOGGLE_HAS_DETAILS' });
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
    <>
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
              key={bookableItem.title}
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
      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label htmlFor="details">
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={toggleDetails}
                    name="details"
                  />
                  Show Details
                </label>
                <button
                  type="button"
                  className="btn"
                  onClick={stopPresentation}
                >
                  Stop
                </button>
              </span>
            </div>
            <p>{bookable.notes}</p>
            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days.sort().map((day) => (
                      <li key={day}>{day}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.map((session) => (
                      <li key={session}>{session}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
