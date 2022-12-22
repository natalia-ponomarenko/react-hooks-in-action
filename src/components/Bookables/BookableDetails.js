import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import data from '../../static.json';

export default function BookableDetails({ bookable }) {
  const [hasDetails, setHasDetails] = useState(true);
  const { days, sessions } = data;

  function toggleDetails() {
    setHasDetails((has) => !has);
  }

  return bookable ? (
    <div className="bookable-details item">
      <div className="item-header">
        <h2>{bookable.title}</h2>
        <span className="controls">
          <label htmlFor="toggleDetails">
            <input
              type="checkbox"
              onChange={toggleDetails}
              checked={hasDetails}
              name="toggleDetails"
            />
            Show Details
          </label>
          <Link
            to={`/bookables/${bookable.id}/edit`}
            replace
            className="btn btn-header"
          >
            <FaEdit/>
            <span>Edit</span>
          </Link>
        </span>
      </div>

      <p>{bookable.notes}</p>
      
      {hasDetails && (
        <div className="item-details">
          <h3>Availability</h3>
          <div className="bookable-availability">
            <ul>
              {bookable.days.sort().map((day) => (
                <li key={day}>{days[day]}</li>
              ))}
            </ul>
            <ul>
              {bookable.sessions.map((session) => (
                <li key={session}>{sessions[session]}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  ) : null;
}

BookableDetails.propTypes = {
  bookable: PropTypes.shape({
    id: PropTypes.number,
    group: PropTypes.string,
    title: PropTypes.string,
    notes: PropTypes.string,
    days: PropTypes.arrayOf(PropTypes.number),
    sessions: PropTypes.arrayOf(PropTypes.number),
  }),
};

BookableDetails.defaultProps = {
  bookable: null,
};
