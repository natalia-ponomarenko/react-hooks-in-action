import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import getData from '../../utils/api';
import ButtonPending from '../../UI/ButtonPending';

export default function UsersList({ user, setUser }) {
  const {data: users = []} = useQuery(
    "users",
    () => getData("http://localhost:3001/users"),
    {
    suspense: true
    }
    );
  
  return (
    <ul className="users items-list-nav">
      {users.map((person) => (
        <li
          key={person.id}
          className={person.id === user?.id ? 'selected' : null}
        >
          <ButtonPending className="btn" onClick={() => setUser(person)}>
            {person.name}
          </ButtonPending>
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
