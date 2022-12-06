import React, { useReducer, useState } from 'react';
import {
  FaChevronLeft,
  FaCalendarDay,
  FaChevronRight,
  FaCalendarCheck,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import reducer from './weekReducer';
import { getWeek } from '../../utils/date-wrangler';

export default function WeekPicker({ date }) {
  const [week, dispatch] = useReducer(reducer, date, getWeek);
  const [dateText, setDateText] = useState("2022-01-01");

  
  function handleInput(e) {
    setDateText(e.target.value);
  }

  function goToDate() {
    dispatch({
      type: 'SET_DATE',
      payload: dateText,
    });
  }

  return (
    <div>
      <p className="date-picker">
        <button
          type="button"
          className="btn"
          onClick={() => dispatch({ type: 'PREV_WEEK' })}
        >
          <FaChevronLeft />
          <span>Prev</span>
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => dispatch({ type: 'TODAY' })}
        >
          <FaCalendarDay />
          <span>Today</span>
        </button>
        <span>
          <input
            type="text"
            placeholder="e.g. 2023-05-12"
            value={dateText}
            onChange={handleInput}
          />
          <button type="button" className="go btn" onClick={goToDate}>
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>
        <button
          type="button"
          className="btn"
          onClick={() => dispatch({ type: 'NEXT_WEEK' })}
        >
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
}

WeekPicker.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};
