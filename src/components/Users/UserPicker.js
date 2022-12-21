import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import Spinner from '../../UI/Spinner';
import { useUser } from './UserContext';
import getData from '../../utils/api';

export default function UserPicker() {
  const [user, setUser] = useUser();

  const { data: users = [], status } = useQuery('users', () =>
    getData('http://localhost:3001/users')
  );

  useEffect(() => {
    setUser(users[0]);
  }, [setUser, users]);

  function handleSelect(e) {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find((person) => person.id === selectedID);

    setUser(selectedUser);
  }

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'error') {
    return <span>Error!</span>;
  }

  return (
    <select value={user?.id} onChange={handleSelect}>
      {users.map((person) => (
        <option key={person.id} value={person.id}>
          {person.name}
        </option>
      ))}
    </select>
  );
}

UserPicker.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    title: PropTypes.string,
    notes: PropTypes.string,
  }),
};

UserPicker.defaultProps = {
  user: null,
};
