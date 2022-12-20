import React, { useState } from 'react';
import UsersList from './UsersList';
import UserDetails from './UserDetails';
import { useUser } from './UserContext';

export default function UsersPage() {
  const [user, setUser] = useState(null);
  const {loggedInUser} = useUser();
  const currentUser = user || loggedInUser;

  return (
    <main className="users-page">
      <UsersList user={currentUser} setUser={setUser} />
      <UserDetails user={currentUser} />
    </main>
  );
}
