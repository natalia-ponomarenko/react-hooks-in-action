import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import getData from '../../utils/api';

export default function UsersList({ user, setUser }) {
  const {data: users = []} = useQuery(
    "bookables",
    () => getData("http://localhost:3001/users"),
    {
    suspense: true
    }
    );
  
  useEffect(() => {
    setUser(users[0]);
  }, [setUser, users]);

  return (
    <ul className="users items-list-nav">
      {users.map((person) => (
        <li
          key={person.id}
          className={person.id === user?.id ? 'selected' : null}
        >
          <button type="button" className="btn" onClick={() => setUser(person)}>
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
