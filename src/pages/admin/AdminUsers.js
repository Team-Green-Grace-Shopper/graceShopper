import React, { useEffect, useState } from "react";
import "./AdminUsers.css";
import { fetchAllUserInfo } from "../../api/apiCalls";

const AdminUsers = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadAllUsers() {
      let response = await fetchAllUserInfo();
      setUsers(response.users);
    }
    loadAllUsers();
  }, []);

  return (
    <div className="adminUsers">
      <h1>[ADMIN] All Users</h1>
      {users.map((user) => {
        return (
          <div key={user.userId}>
            <p>User Id: {user.userId}</p>
            <p>Email: {user.email}</p>

            {user.orders &&
              user.orders.map((order) => {
                return (
                  <div key={order.orderId}>
                    <p>Orders:</p>
                    <p>order id: {order.orderId}</p>
                    <p>order type: {order.orderType}</p>
                    <p>-----------</p>
                    {order.items.map((item) => {
                      return (
                        <div key={item.orderItemsId}>
                          <p>Order Items:</p>
                          <p>name:{item.name}</p>
                          <img
                            className="teeImg"
                            src={item.imageURL}
                            alt={item.name}
                          />
                          <p>price: {item.price}</p>
                          <p>size: {item.size}</p>
                          <p>quantity: {item.quantity}</p>
                          <p>------</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            <p>------------------------</p>
          </div>
        );
      })}
    </div>
  );
};

export default AdminUsers;
