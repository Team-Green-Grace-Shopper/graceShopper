import React, { useState, useEffect } from "react";
import "./UserCheckoutForm.css";

const UserCheckoutForm = ({ user, shipOption, setShipOption }) => {
  //USE STATE----------
  const [userId, setUserId] = useState(0);

  // FORMS (OPEN/CLOSE)
  const [infoIsOpen, setInfoIsOpen] = useState(true);
  const [shippingIsOpen, setShippingIsOpen] = useState(false);
  const [paymentIsOpen, setPaymentIsOpen] = useState(false);

  // FORMS (INITIAL/FILLED OUT)
  const [infoIsDone, setInfoIsDone] = useState(false);
  const [shippingIsDone, setShippingIsDone] = useState(false);
  const [paymentIsDone, setPaymentIsDone] = useState(false);

  // INFO FORM
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  //SHIPPING FORM
  const [shippingAddress, setShippingAddress] = useState({});
  const [shipFname, setShipFname] = useState("");
  const [shipLname, setShipLname] = useState("");
  const [shipAddress, setShipAddress] = useState("");
  const [shipCity, setShipCity] = useState("");
  const [shipState, setShipState] = useState("");
  const [shipZip, setShipZip] = useState("");

  //PAYMENT FORM
  const [isChecked, setIsChecked] = useState(true);
  const [payFname, setPayFname] = useState("");
  const [payLname, setPayLname] = useState("");
  const [payAddress, setPayAddress] = useState("");
  const [payCity, setPayCity] = useState("");
  const [payState, setPayState] = useState("");
  const [payZip, setPayZip] = useState("");
  //do not save! pay info is on state for user confirmation only!
  const [ccNum, setCCNum] = useState("");
  const lastFourDigits = ccNum.slice(12); //only show last 4 digits on confirmation

  // ----------USE EFFECT---------
  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setEmail(user.email);
      setFname(user.fname);
      setLname(user.lname);
      setPhone(user.phone);
    }
  }, [user]);

  // useEffect(() => {
  //   async function loadShippingAddress() {
  //     const shippingAddress = await getShippingAddressByUser(user.id);
  //     setShippingAddress(shippingAddress);
  //   }
  //   loadShippingAddress();

  //   shippingAddress.address && setShipAddress(shippingAddress.address);
  //   shippingAddress.city && setShipCity(shippingAddress.city);
  //   shippingAddress.state && setShipCity(shippingAddress.state);
  //   shippingAddress.zip && setShipZip(shippingAddress.zip);
  // }, [setShippingAddress]);

  // useEffect(() => {
  //   //if (bill address) {
  //   //set stuff
  //   //}
  // }, [third]);

  const userData = {
    userId: userId,
    fname: fname,
    lname: lname,
    phone: phone,
  };

  const infoHandler = async (event) => {
    event.preventDefault();
    // await updateUser(userData);

    setInfoIsOpen(false);
    setShippingIsOpen(true);
    setInfoIsDone(true);
  };

  const shippingHandler = async (event) => {
    event.preventDefault();
    //call update order function (for shippingOption)

    setShippingIsOpen(false);
    setPaymentIsOpen(true);
    setShippingIsDone(true);
  };

  const paymentHandler = async (event) => {
    event.preventDefault();
    //process payment info through 3rd party

    setPaymentIsOpen(false);
    setPaymentIsDone(true);
  };

  //--------RENDER--------
  return (
    <div className="checkoutForm">
      {/* --------INFO-------- */}
      <h3>User Info</h3>
      {infoIsOpen ? (
        <form>
          <p>email: {email}</p>
          <br></br>

          <label>first name</label>
          <input
            onChange={(event) => {
              setFname(event.target.value);
              setShipFname(event.target.value);
              setPayFname(event.target.value);
            }}
          />
          <br></br>

          <label>last name</label>
          <input
            onChange={(event) => {
              setLname(event.target.value);
              setShipLname(event.target.value);
              setPayLname(event.target.value);
            }}
          />
          <br></br>

          <label>phone</label>
          <input
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <br></br>

          <button type="submit" onClick={infoHandler}>
            Save and Continue
          </button>
        </form>
      ) : (
        <div>
          {infoIsDone ? (
            <div>
              <p>{email}</p>
              <p>
                {fname} {lname}
              </p>
              <p>{phone}</p>

              <button
                onClick={(e) => {
                  setInfoIsOpen(true);
                  setShippingIsOpen(false);
                  setPaymentIsOpen(false);
                }}
              >
                Edit Info
              </button>
            </div>
          ) : null}
        </div>
      )}

      {/* --------SHIPPING-------- */}
      <h3>Shipping Option</h3>
      {shippingIsOpen ? (
        <form>
          <label>fname</label>
          <input
            required
            defaultValue={fname}
            onChange={(event) => {
              setShipFname(event.target.value);
              setPayFname(event.target.value);
            }}
          />
          <br></br>

          <label>lname</label>
          <input
            required
            defaultValue={lname}
            onChange={(event) => {
              setShipLname(event.target.value);
              setPayLname(event.target.value);
            }}
          />
          <br></br>

          <label>address</label>
          <input
            required
            onChange={(event) => {
              setShipAddress(event.target.value);
              setPayAddress(event.target.value);
            }}
          />
          <br></br>

          <label>city</label>
          <input
            required
            onChange={(event) => {
              setShipCity(event.target.value);
              setPayCity(event.target.value);
            }}
          />
          <br></br>

          <label>state</label>
          <input
            required
            onChange={(event) => {
              setShipState(event.target.value);
              setPayState(event.target.value);
            }}
          />
          <br></br>

          <label>zip code</label>
          <input
            required
            onChange={(event) => {
              setShipZip(event.target.value);
              setPayZip(event.target.value);
            }}
          />
          <br></br>

          <input
            required
            name="shippingOption"
            type="radio"
            onChange={(event) => {
              setShipOption("Standard shipping (3-7 days) $6");
            }}
          />
          <label>Standard shipping (3-7 days) $6</label>
          <br></br>

          <input
            required
            name="shippingOption"
            type="radio"
            onChange={(event) => {
              setShipOption("Express shipping (2-4 days) $15");
            }}
          />
          <label>Express shipping (2-4 days) $15</label>
          <br></br>

          <input
            required
            name="shippingOption"
            type="radio"
            onChange={(event) => {
              setShipOption("Next Day Shipping $25");
            }}
          />
          <label>Next Day Shipping $25</label>
          <br></br>

          <button onClick={shippingHandler} type="submit">
            Save and Continue
          </button>
        </form>
      ) : (
        <div>
          {shippingIsDone ? (
            <div>
              <h3>Shipping Address</h3>
              <p>
                {shipFname} {shipLname}
              </p>
              <p>{shipAddress}</p>
              <p>{shipCity}</p>
              <p>{shipState}</p>
              <p>{shipZip}</p>
              <p>{shipOption}</p>

              <button
                onClick={(e) => {
                  setInfoIsOpen(false);
                  setShippingIsOpen(true);
                  setPaymentIsOpen(false);
                }}
              >
                Edit Shipping
              </button>
            </div>
          ) : null}
        </div>
      )}

      {/* --------PAYMENT-------- */}
      <h3>Payment</h3>
      {paymentIsOpen ? (
        <form>
          <label>First Name</label>
          <input
            required
            defaultValue={fname}
            onChange={(event) => {
              setPayFname(event.target.value);
            }}
          />
          <br></br>

          <label>Last Name</label>
          <input
            required
            defaultValue={lname}
            onChange={(event) => {
              setPayLname(event.target.value);
            }}
          />
          <br></br>

          <label>CC #</label>
          <input
            required
            onChange={(event) => {
              setCCNum(event.target.value);
            }}
          />
          <br></br>

          <label>Exp (MM/YY)</label>
          <input required />
          <br></br>

          <label>CVV/CVC</label>
          <input required />
          <br></br>

          <input
            type="checkbox"
            checked={isChecked ? "checked" : null}
            onChange={(event) => {
              setIsChecked(!isChecked);
            }}
          />
          <label>Same as my shipping address.</label>
          <br></br>

          {isChecked ? (
            <>
              <p>
                {shipFname} {shipLname}
              </p>
              <p>{shipAddress}</p>
              <p>
                {shipCity}, {shipState} {shipZip}
              </p>
            </>
          ) : (
            <>
              <h3>Billing Address</h3>
              <label>fname</label>
              <input
                required
                defaultValue={fname}
                onChange={(event) => {
                  setPayFname(event.target.value);
                }}
              />
              <br></br>

              <label>lname</label>
              <input
                required
                defaultValue={lname}
                onChange={(event) => {
                  setPayLname(event.target.value);
                }}
              />
              <br></br>

              <label>address</label>
              <input
                required
                onChange={(event) => {
                  setPayAddress(event.target.value);
                }}
              />
              <br></br>

              <label>city</label>
              <input
                required
                onChange={(event) => {
                  setPayCity(event.target.value);
                }}
              />
              <br></br>

              <label>state</label>
              <input
                required
                onChange={(event) => {
                  setPayState(event.target.value);
                }}
              />
              <br></br>

              <label>zip code</label>
              <input
                required
                onChange={(event) => {
                  setPayZip(event.target.value);
                }}
              />
              <br></br>
            </>
          )}

          <button onClick={paymentHandler} type="submit">
            Save
          </button>
        </form>
      ) : (
        <div>
          {paymentIsDone ? (
            <div>
              <p>Payment Method</p>
              <p>[icon] Card ending in {lastFourDigits}</p>

              <h3>Billing Address</h3>
              {isChecked ? (
                <p>Same as shipping address</p>
              ) : (
                <>
                  <p>
                    {payFname} {payLname}
                  </p>
                  <p>{payAddress}</p>
                  <p>
                    {payCity}, {payState} {payZip}
                  </p>
                </>
              )}

              <button
                onClick={(e) => {
                  setInfoIsOpen(false);
                  setShippingIsOpen(false);
                  setPaymentIsOpen(true);
                }}
              >
                Edit Payment
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default UserCheckoutForm;
