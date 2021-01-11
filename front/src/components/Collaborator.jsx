import React from 'react';
import CreateProfile from './CreateProfile';
import NotConnected from './NotConnected';
import SearchComplianceOfficer from './SearchComplianceOfficer';

export default function Collaborator(props) {
  const user = props.user;
  const updateUser = (userUpdated) => {
    props.updateUser(userUpdated);
  };

  return (
    <>
      {!user ? (
        <NotConnected />
      ) : !user.accountHasProfile ? (
        <CreateProfile user={user} updateUser={updateUser} />
      ) : (
        <SearchComplianceOfficer user={user} />
      )}
    </>
  );
}
