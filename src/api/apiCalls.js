const APIURL = "http://localhost:4000/api";

//REGISTER USER
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
