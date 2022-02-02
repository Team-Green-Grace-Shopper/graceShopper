import React, { useEffect, useState } from "react";
import "./AdminUsers.css";
import { fetchAllUserInfo } from "../api/apiCalls";

const AdminUsers = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadAllUsers() {
      let response = await fetchAllUserInfo();
      console.log(response.users);
      setUsers(response.users);
    }
    loadAllUsers();
  }, []);

  return (
    <div className="products">
      <h1>[ADMIN] All Users</h1>
      {users.map((user) => {
        return (
          <div key={user.userId}>
            <p>User Id: {user.userId}</p>
            <p>Email: {user.email}</p>
            <p>--------------</p>
          </div>
        );
      })}
    </div>
  );
};

export default AdminUsers;
