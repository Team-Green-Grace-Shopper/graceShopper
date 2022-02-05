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
          <div className="userInfo" key={user.userId}>
            <p>User Id: {user.userId}</p>
            <p>Email: {user.email}</p>

            {user.orders ? <p>Orders:</p> : null}
            {user.orders &&
              user.orders.map((order) => {
                return (
                  <div className="orderInfo" key={order.orderId}>
                    <p>order id: {order.orderId}</p>
                    <p>order type: {order.orderType}</p>

                    {order.items ? <p>Order Items:</p> : null}
                    {order.items &&
                      order.items.map((item) => {
                        return (
                          <div className="itemInfo" key={item.orderItemsId}>
                            <p>item id: {item.orderItemsId}</p>
                            <p>name:{item.name}</p>
                            <img
                              className="teeImg"
                              src={item.imageURL}
                              alt={item.name}
                            />
                            <p>price: {item.price}</p>
                            <p>size: {item.size}</p>
                            <p>quantity: {item.quantity}</p>
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
