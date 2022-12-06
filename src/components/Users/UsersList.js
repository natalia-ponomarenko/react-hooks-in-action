import React, { useState, useEffect } from 'react';
import Spinner from '../../UI/Spinner';
import getData from '../../utils/api';

export default function UsersList() {
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);
  const [users, setUsers] = useState(null);
  const user = users?.[selectedUserIndex];
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData('http://localhost:3001/userss')
      .then((usersList) => setUsers(usersList))
      .catch((unexpectedError) => console.log(unexpectedError.message));
  }, []);

  if (users === null) {
    // setLoading(true)
    return <Spinner/>
  }

  // if (error) {
  //   setLoading(false)
  // }

  const handleButtonClick = (selectedId) => {
    setSelectedUserIndex(selectedId);
  };

  return (
    <>
    {/* {loading && <Spinner/>} */}
      <ul className="users items-list-nav">
        {users.map((person, i) => (
          <li
            key={person.name}
            className={i === selectedUserIndex ? 'selected' : null}
          >
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick(i)}
            >
              {person.name}
            </button>
          </li>
        ))}
      </ul>
      {user && (
        <div className="item user">
          <div className="item-header">
            <h2>{user.name}</h2>
          </div>
          <div className="user-details">
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </>
  );
}
