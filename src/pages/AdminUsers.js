import React, { useEffect, useState } from "react";
import "./AdminUsers.css";
import { fetchAllUserInfo, getAllOrderItems } from "../api/apiCalls";

const AdminUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadAllUsers() {
      let response = await fetchAllUserInfo();
      setUsers(response);
    }
    loadAllUsers();

    // async function loadAllOrderItems() {
    //   let response = await getAllOrderItems(1);
    //   console.log("inside useEffect in AdminUsers response: ", response);
    //   setItems(response);
    // }
    // loadAllOrderItems();
  }, []);

  return (
    <div className="products">
      <h1>[ADMIN] All Users</h1>
      {users.map((user) => {
        return (
          <div key={user.userId}>
            <p>User Id: {user.userId}</p>
            <p>Email: {user.email}</p>
            <p>Order Id: {user.orderId}</p>
            <p>-----------</p>
          </div>
        );
      })}

      {items.map((item) => {
        return (
          <div key={item.orderItemsId}>
            <p>OI id: {item.orderItemsId}</p>
            <p>order id: {item.orderId}</p>
            <p>product id: {item.productId}</p>
            <p>name: {item.name}</p>
            <p>imageURL: {item.imageURL}</p>
            <p>price: {item.price}</p>
            <p>size: {item.size}</p>
            <p>quantity: {item.quantity}</p>
            <p>--------------</p>
          </div>
        );
      })}
    </div>
  );
};

export default AdminUsers;
