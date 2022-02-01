const APIURL = "http://localhost:4000/api";

// --------USER API CALLS------
export const registerUser = async (userData) => {
  const response = await fetch(`${APIURL}/users/register`, {
    method: "POST",
    // headers: code here,
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

// --------PRODUCT API CALLS---------
export const getAllProducts = async () => {
  const response = await fetch(`${APIURL}/products`);

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

export const getProductById = async (productId) => {
  const response = await fetch(`${APIURL}/products/${productId}`);

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};
// ----------ORDER ITEMS API CALLS-------------
export const getAllOrderItems = async (orderId) => {
  const response = await fetch(`${APIURL}/orderItems/all/${orderId}`);

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//---------ADMIN API CALLS----------
export const fetchAllUserInfo = async () => {
  const response = await fetch(`${APIURL}/users/info`);

  if (response.ok) {
    const result = await response.json();

    return result;
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};
