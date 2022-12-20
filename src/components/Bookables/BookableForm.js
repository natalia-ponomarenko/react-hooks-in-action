import { Link } from 'react-router-dom';
import React from 'react';
import { FaCloudUploadAlt, FaTrash, FaWindowClose } from 'react-icons/fa';
import PropTypes from 'prop-types';

import {sessions as sessionsArray, days as daysArray} from '../../static.json';

export default function BookableForm({
  formState = {},
  handleSubmit,
  handleDelete,
}) {
  const { state = {}, handleChange, handleChecked } = formState;
  const { title = '', group = '', notes = '' } = state;
  const { days = [], sessions = [] } = state;

  return (
    <main className="bookables-form">
      <div className="item item-form">
        <div className="item-header">
          <h2>{handleDelete ? 'Edit' : 'New'} Bookable</h2>
        </div>

        <label htmlFor="title" className="field">
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="group" className="field">
          Group
          <input
            type="text"
            name="group"
            value={group}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="notes" className="field">
          Notes
          <textarea
            name="notes"
            value={notes}
            onChange={handleChange}
            rows="4"
          />
        </label>

        <div className="bookable-availability">
          <ul>
            {daysArray.map((day, i) => (
              <li key={day}>
                <label htmlFor="days">
                  <input
                    checked={days.indexOf(i) !== -1}
                    type="checkbox"
                    name="days"
                    value={i}
                    onChange={handleChecked}
                  />
                  {day}
                </label>
              </li>
            ))}
          </ul>

          <ul>
            {sessionsArray.map((session, i) => (
              <li key={session}>
                <label htmlFor="sessions">
                  <input
                    checked={sessions.indexOf(i) !== -1}
                    type="checkbox"
                    name="sessions"
                    value={i}
                    onChange={handleChecked}
                  />
                  {session}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="controls">
        {handleDelete && (
          <button
            type="button"
            className="btn btn-delete controls-alt"
            onClick={handleDelete}
          >
            <FaTrash />
            <span>Delete</span>
          </button>
        )}
        <Link
          className="btn"
          to={state.id ? `/bookables/${state.id}` : '/bookables'}
          replace
        >
          <FaWindowClose />
          <span>Cancel</span>
        </Link>
        <button type="submit" className="btn" onClick={handleSubmit}>
          <FaCloudUploadAlt />
          <span>Save</span>
        </button>
      </p>
    </main>
  );
}


BookableForm.propTypes = {
  formState: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}
