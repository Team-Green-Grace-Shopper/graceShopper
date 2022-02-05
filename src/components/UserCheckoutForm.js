import React, { useState, useEffect } from "react";
import "./UserCheckoutForm.css";

const UserCheckoutForm = ({
  user,
  shipOption,
  setShipOption,
  setEmail,
  setFirstName,
  setFormIsDone,
}) => {
  //USE STATE----------
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
  const [infoEmail, setInfoEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [infoFeedback, setInfoFeedback] = useState("");

  //SHIPPING FORM
  const [shipFname, setShipFname] = useState("");
  const [shipLname, setShipLname] = useState("");
  const [shipAddress, setShipAddress] = useState("");
  const [shipCity, setShipCity] = useState("");
  const [shipState, setShipState] = useState("");
  const [shipZip, setShipZip] = useState("");
  const [shipFeedback, setShipFeedback] = useState("");

  //PAYMENT FORM
  const [isChecked, setIsChecked] = useState(true);
  const [payFname, setPayFname] = useState("");
  const [payLname, setPayLname] = useState("");
  const [payAddress, setPayAddress] = useState("");
  const [payCity, setPayCity] = useState("");
  const [payState, setPayState] = useState("");
  const [payZip, setPayZip] = useState("");
  const [payFeedback, setPayFeedback] = useState("");
  //do not save! pay info is on state for user confirmation only!
  const [ccNum, setCCNum] = useState("");
  const lastFourDigits = ccNum.slice(12); //only show last 4 digits on confirmation

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const infoHandler = async (event) => {
    event.preventDefault();

    if (!fname) {
      setInfoFeedback("Please enter a first name");
    } else {
      setInfoFeedback("");
      setInfoIsOpen(false);
      setShippingIsOpen(true);
      setInfoIsDone(true);
    }
  };

  const shippingHandler = async (event) => {
    event.preventDefault();

    if (!shipOption) {
      setShipFeedback("Please select a shipping option");
    } else {
      setShipFeedback("");
      setShippingIsOpen(false);
      setPaymentIsOpen(true);
      setShippingIsDone(true);
    }
  };

  const paymentHandler = async (event) => {
    event.preventDefault();

    if (!ccNum) {
      setPayFeedback("Please enter a credit card number");
    } else if (ccNum.length !== 16) {
      setPayFeedback("Credit card number must be 16 digits, no spaces");
    } else {
      setPayFeedback("");
      setPaymentIsOpen(false);
      setPaymentIsDone(true);
      setFormIsDone(true);
    }
  };

  //--------RENDER--------
  return (
    <div className="user_checkoutForm">
      {/* --------INFO-------- */}
      <h3>User Info</h3>
      {infoIsOpen ? (
        <form>
          <label>email</label>
          <input
            defaultValue={user.email}
            required
            onChange={(event) => {
              setInfoEmail(event.target.value);
              setEmail(event.target.value);
            }}
          />
          <br></br>

          <label>first name</label>
          <input
            defaultValue={fname}
            required
            onChange={(event) => {
              setInfoFeedback("");
              setFname(event.target.value);
              setFirstName(event.target.value);
              setShipFname(event.target.value);
              setPayFname(event.target.value);
            }}
          />
          <br></br>

          <label>last name</label>
          <input
            defaultValue={lname}
            onChange={(event) => {
              setLname(event.target.value);
              setShipLname(event.target.value);
              setPayLname(event.target.value);
            }}
          />
          <br></br>

          <label>phone</label>
          <input
            defaultValue={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <br></br>
          {infoFeedback ? <p>{infoFeedback}</p> : null}
          <button type="submit" onClick={infoHandler}>
            Save and Continue
          </button>
        </form>
      ) : (
        <div>
          {infoIsDone ? (
            <div>
              <p>{infoEmail}</p>
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
            defaultValue={fname}
            onChange={(event) => {
              setShipFname(event.target.value);
              setPayFname(event.target.value);
            }}
          />
          <br></br>

          <label>lname</label>
          <input
            defaultValue={lname}
            onChange={(event) => {
              setShipLname(event.target.value);
              setPayLname(event.target.value);
            }}
          />
          <br></br>

          <label>address</label>
          <input
            defaultValue={shipAddress}
            onChange={(event) => {
              setShipAddress(event.target.value);
              setPayAddress(event.target.value);
            }}
          />
          <br></br>

          <label>city</label>
          <input
            defaultValue={shipCity}
            onChange={(event) => {
              setShipCity(event.target.value);
              setPayCity(event.target.value);
            }}
          />
          <br></br>

          <label>state</label>
          <input
            defaultValue={shipState}
            onChange={(event) => {
              setShipState(event.target.value);
              setPayState(event.target.value);
            }}
          />
          <br></br>

          <label>zip code</label>
          <input
            defaultValue={shipZip}
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
              setShipFeedback("");
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
              setShipFeedback("");
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
              setShipFeedback("");
              setShipOption("Next Day Shipping $25");
            }}
          />
          <label>Next Day Shipping $25</label>
          <br></br>

          {shipFeedback ? <p>{shipFeedback}</p> : null}
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
            defaultValue={fname}
            onChange={(event) => {
              setPayFname(event.target.value);
            }}
          />
          <br></br>

          <label>Last Name</label>
          <input
            defaultValue={lname}
            onChange={(event) => {
              setPayLname(event.target.value);
            }}
          />
          <br></br>

          <label>CC #</label>
          <input
            defaultValue={ccNum}
            onChange={(event) => {
              setPayFeedback("");
              setCCNum(event.target.value);
            }}
          />
          <br></br>

          <label>Exp (MM/YY)</label>
          <input />
          <br></br>

          <label>CVV/CVC</label>
          <input />
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
                defaultValue={payFname}
                onChange={(event) => {
                  setPayFname(event.target.value);
                }}
              />
              <br></br>

              <label>lname</label>
              <input
                defaultValue={payLname}
                onChange={(event) => {
                  setPayLname(event.target.value);
                }}
              />
              <br></br>

              <label>address</label>
              <input
                defaultValue={payAddress}
                onChange={(event) => {
                  setPayAddress(event.target.value);
                }}
              />
              <br></br>

              <label>city</label>
              <input
                defaultValue={payCity}
                onChange={(event) => {
                  setPayCity(event.target.value);
                }}
              />
              <br></br>

              <label>state</label>
              <input
                defaultValue={payState}
                onChange={(event) => {
                  setPayState(event.target.value);
                }}
              />
              <br></br>

              <label>zip code</label>
              <input
                defaultValue={payZip}
                onChange={(event) => {
                  setPayZip(event.target.value);
                }}
              />
              <br></br>
            </>
          )}
          {payFeedback ? <p>{payFeedback}</p> : null}
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
