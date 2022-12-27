import React, { useState, Suspense } from 'react';
import UsersList from './UsersList';
import UserDetails from './UserDetails';
import { useUser } from './UserContext';
import PageSpinner from "../../UI/PageSpinner";

export default function UsersPage () {
  const [loggedInUser] = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const user = selectedUser || loggedInUser;

  const switchUser = (nextUser) => {
    setSelectedUser(nextUser);
  }

  return user ? (
    <main className="users-page">
      <UsersList user={user} setUser={switchUser}/>

      <Suspense fallback={<PageSpinner/>}>
        <UserDetails userID={user.id}/>
      </Suspense>
    </main>
  ) : <PageSpinner/>;
}