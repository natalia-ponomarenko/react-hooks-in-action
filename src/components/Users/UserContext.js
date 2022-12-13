import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();
export default UserContext;

export const UserSetContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
      {children}
      </UserSetContext.Provider>
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
