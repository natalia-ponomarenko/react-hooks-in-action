import React, {useState} from 'react';
import UsersList from './UsersList';
import UserDetails from './UserDetails';

export default function UsersPage() {
  const [user, setUser] = useState();
  return (
    <main className="users-page">
      <UsersList user={user} setUser={setUser} />
      <UserDetails user={user} />
    </main>
  )
};
