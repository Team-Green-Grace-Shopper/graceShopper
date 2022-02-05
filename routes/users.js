const { Router } = require("express");
const usersRouter = Router();

//jwt
const jwt = require("jsonwebtoken");
const JWT_SECRET = "some default secret";

//middleware
const checkIsAdmin = require("../middleware/checkIsAdmin");

const {
  createUser,
  getUser,
  getUserByEmail,
  _getAllUsers,
  getAllUserInfo,
  getAllOrdersByUserId,
} = require("../db");

//REGISTER USER
usersRouter.post("/register", async (req, res, next) => {
  const { email, password } = req.body;
  const isAdmin = false;

  try {
    if (!email) {
      res.status(400).send({ error: "Please enter a valid email" });
    }

    if (!password) {
      res.status(400).send({ error: "Please enter a valid password" });
    }

    if (password.length < 8) {
      res
        .status(400)
        .send({ error: "Invalid password, must be at least 8 characters" });

      // throw new Error("Invalid password, must be at least 8 characters")
    }

    const retrievedUser = await getUserByEmail(email);
    if (retrievedUser) {
      res.status(400).send({ error: "Email already exists" });
    }
    
    const createdUser = await createUser({ email, password, isAdmin });

    res.status(201).json({ user: createdUser });
  } catch (error) {
    return next(error);
  }
});

//LOGIN USER
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new Error("Must enter a email"));
  }

  if (!password) {
    return next(new Error("Must enter a password"));
  }

  try {
    const user = await getUser({ email, password });

    if (user) {
      const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET);

      res.status(200).send({ token, email: user.email, id: user.id, isAdmin: user.isAdmin });
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    return next(error);
  }
});

//GET ALL USERS
usersRouter.get("/all", async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();

    res.status(200).send(allUsers);

    // if (checkIsAdmin) {

    // }
  } catch (error) {
    return next(error);
  }
});

//GET ALL USER INFO (**)
usersRouter.get("/info", async (req, res, next) => {
  try {
    const info = await getAllUserInfo();

    res.status(200).send(info);
  } catch (error) {
    return next(error);
  }
});

module.exports = usersRouter;
