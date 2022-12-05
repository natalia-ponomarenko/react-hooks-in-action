import React, { useState } from 'react'
import data from '../../static.json'

export default function UsersList() {
  const [selectedUserIndex, setSelectedUserIndex] = useState(0)
  const { users } = data
  const user = users[selectedUserIndex]

  const handleButtonClick = (selectedId) => {
    setSelectedUserIndex(selectedId)
  }
  return (
    <>
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
  )
}
