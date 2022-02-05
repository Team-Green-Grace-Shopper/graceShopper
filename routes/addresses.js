const { Router } = require("express");
const addressesRouter = Router();

const {
  createAddress,
  getShippingAddressByUser,
  getBillingAddressByUser,
} = require("../db");

//CREATE ADDRESS
addressesRouter.post("/create", async (req, res, next) => {
  const { userId, type, address, city, state, zip } = req.body;

  try {
    const createdAddress = await createAddress({
      userId,
      type,
      address,
      city,
      state,
      zip,
    });

    res.status(201).json({ address: createdAddress });
  } catch (error) {
    return next(error);
  }
});

//GET SHIPPING ADDRESS
addressesRouter.get("/shipping/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const shippingAddress = await getShippingAddressByUser(userId);

    res.status(200).json({ shippingAddress: shippingAddress });
  } catch (error) {
    return next(error);
  }
});

//GET BILLING ADDRESS
addressesRouter.get("/billing/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const billingAddress = await getBillingAddressByUser(userId);

    res.status(200).json({ billingAddress: billingAddress });
  } catch (error) {
    return next(error);
  }
});

module.exports = addressesRouter;
