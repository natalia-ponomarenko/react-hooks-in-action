import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../UI/Spinner';
import useFetch from '../../utils/useFetch';

export default function UsersList({ user, setUser }) {
  const {data: users = [], status, error} = useFetch(
    "http://localhost:3001/users"
  );
;

  if (status === "error") {
    return <p>{error.message}</p>
  }

  if (status === "loading") {
    return <p><Spinner/> Loading users...</p>
  }

  return (
      <ul className="users items-list-nav">
        {users.map((person) => (
          <li
            key={person.id}
            className={person.id === user?.id ? 'selected' : null}
          >
            <button
              type="button"
              className="btn"
              onClick={() => setUser(person)}
            >
              {person.name}
            </button>
          </li>
        ))}
      </ul>
  );
}

UsersList.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    notes: PropTypes.string,
  }),
  setUser: PropTypes.func.isRequired,
};

UsersList.defaultProps = {
  user: null,
};