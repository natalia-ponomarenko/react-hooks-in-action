import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../UI/Spinner';
import UserContext, {UserSetContext} from "./UserContext";

export default function UserPicker() {
  const [users, setUsers] = useState(null);
  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext)

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
};

UserPicker.defaultProps = {
  user: null,
};
