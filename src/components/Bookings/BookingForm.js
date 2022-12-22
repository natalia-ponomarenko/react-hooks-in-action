import React from 'react';
import { FaTrash, FaCloudUploadAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

import useFormState from '../Bookables/useFormState';

export default function BookingForm({ booking, bookable, onSave, onDelete }) {
  const { state, handleChange } = useFormState(booking);
  const isNew = booking?.bookableId === undefined;

  return booking ? (
    <>
      <div className="booking-details-fields item-form">
        <div>Title</div>
        <p>
          <input
            type="text"
            name="title"
            value={state.title}
            onChange={handleChange}
          />
        </p>

        <div>Bookable</div>
        <p>{bookable.title}</p>

        <div>Booking Date</div>
        <p>{new Date(booking.date).toLocaleDateString()}</p>

        <div>Session</div>
        <p>{booking.session}</p>

        <div>Notes</div>
        <p>
          <textarea
            name="notes"
            rows={6}
            cols={30}
            value={booking.notes}
            onChange={handleChange}
          />
        </p>
      </div>

      <p className="controls">
        {!isNew && (
          <button
            type="button"
            className="btn btn-delete"
            onClick={() => onDelete(booking)}
          >
            <FaTrash />
            <span>Delete</span>
          </button>
        )}
        <button type="button" className="btn" onClick={() => onSave(state)}>
          <FaCloudUploadAlt />
          <span>{isNew ? 'Add Booking' : 'Update'}</span>
        </button>
      </p>
    </>
  ) : null;
}

BookingForm.propTypes = {
  booking: PropTypes.shape({
    session: PropTypes.string,
    date: PropTypes.string,
    bookableId: PropTypes.number,
    title: PropTypes.string,
    notes: PropTypes.string,
  }),
  bookable: PropTypes.shape({
    id: PropTypes.number,
    group: PropTypes.string,
    title: PropTypes.string,
    days: PropTypes.arrayOf(PropTypes.number),
    sessions: PropTypes.arrayOf(PropTypes.number),
  }),
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

BookingForm.defaultProps = {
  booking: null,
  bookable: null,
};
