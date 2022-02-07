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
      <h1>All Users</h1>
      {users.map((user) => {
        return (
          <div className="userInfo" key={user.userId}>
            <p>User ID: {user.userId}</p>
            <p>Email: {user.email}</p>

            {user.orders ? <p>Orders:</p> : null}
            {user.orders &&
              user.orders.map((order) => {
                return (
                  <div className="orderInfo" key={order.orderId}>
                    <p>Order ID: {order.orderId}</p>
                    <p>Order Type: {order.orderType}</p>
                    {order.items ? <p>Order Items:</p> : null}

                    {order.items &&
                      order.items.map((item) => {
                        return (
                          <div className="itemInfo" key={item.orderItemsId}>
                            <div>
                              <p>Item ID: {item.orderItemsId}</p>
                              <p>Name: {item.name}</p>
                              <img
                                className="teeImg"
                                src={item.imageURL}
                                alt={item.name}
                              />
                              <p>Price: {item.price}.00</p>
                              <p>Size: {item.size}</p>
                              <p>Quantity: {item.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default AdminUsers;
