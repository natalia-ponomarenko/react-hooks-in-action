import React, { useReducer } from 'react';
import { FaChevronLeft, FaCalendarDay, FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import reducer from './weekReducer';
import { getWeek } from '../../utils/date-wrangler';

export default function WeekPicker({ date }) {
  const [week, dispatch] = useReducer(reducer, date, getWeek);
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
