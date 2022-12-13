import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../UI/Spinner';

export default function UserPicker({ user, setUser }) {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
        setUser(data[0]);
      });
  }, [setUser]);
  
  function handleSelect(e) {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find((person) => person.id === selectedID);
    setUser(selectedUser);
  }
  
  if (users === null) {
    return <Spinner />;
  }

  return (
    <select value={user?.id} onChange={handleSelect}>
      {users.map((person) => (
        <option key={person.id} value={person.id} >
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
  setUser: PropTypes.func.isRequired,
};

UserPicker.defaultProps = {
  user: null,
};
