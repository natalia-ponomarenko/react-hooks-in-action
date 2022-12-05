import React, { useReducer } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import data from '../../static.json';
import reducer from './reducer';

const initialState = {
  group: 'Rooms',
  bookableIndex: 0,
  hasDetails: true,
  bookables: data.bookables,
};

export default function BookablesList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { group, bookableIndex, bookables, hasDetails } = state;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const bookable = bookablesInGroup[bookableIndex];

  function getUniqueValues(array, property) {
    const propValues = array.map((element) => element[property]);
    const uniqueValues = new Set(propValues);
    const uniqueValuesArray = [...uniqueValues];
    return uniqueValuesArray;
  }
  const groups = getUniqueValues(bookables, 'group');

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

  function toggleDetails() {
    dispatch({ type: 'TOGGLE_HAS_DETAILS' });
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
          <button className="btn" type="button" onClick={nextBookable}>
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
