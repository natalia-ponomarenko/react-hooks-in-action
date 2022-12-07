import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../UI/Spinner';
import getData from '../../utils/api';

export default function UsersList({ user, setUser }) {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getData('http://localhost:3001/users')
      .then((usersList) => {
        setUsers(usersList);
        setUser(usersList[0])
        setLoading(false);
      })
      .catch((unexpectedError) => {
        setError(unexpectedError);
        setLoading(false);
      });
  }, [setUser]);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (loading) {
    return (
      <p>
        <Spinner /> Loading users...
      </p>
    );
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