import React from 'react';
import CreateProfile from './CreateProfile';
import NotConnected from './NotConnected';
import SearchComplianceOfficer from './SearchComplianceOfficer';

export default function Collaborator(props) {
  const user = props.user;
  function updateUser(userUpdated) {
    props.updateUser(userUpdated);
  }

  return (
    <>
      {!user ? (
        <NotConnected />
      ) : !user.accountHasProfile ? (
        <CreateProfile
          user={user}
          updateUser={(userUpdated) => updateUser(userUpdated)}
        />
      ) : (
        <SearchComplianceOfficer user={user} />
      )}
    </>
  );
}
