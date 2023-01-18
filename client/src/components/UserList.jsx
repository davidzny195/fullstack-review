import React from 'react';

const UserList = ({ users }) => {
  return (
    <div>
      Users List
      {users.map((user, idx) => {
        return (
          <div key={idx}>
            <a href={user.url}>{user.username}</a>
          </div>
        )
    })}
    </div>
  )


}

export default UserList;