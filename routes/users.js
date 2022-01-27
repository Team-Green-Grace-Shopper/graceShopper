const jwt = require("jsonwebtoken");

const { Router } = require("express");

const { createUser, getUser, getUserByEmail } = require("../db");

const userRouter = Router();

const JWT_SECRET = "some default secret";

//REGISTER USER
userRouter.post("/register", async (req, res, next) => {
  const { email, password } = req.body;

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

    const createdUser = await createUser({ email, password });

    res.status(201).json({ user: createdUser });
  } catch (error) {
    return next(error);
  }
});

//LOGIN USER
userRouter.post("/login", async (req, res, next) => {
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

      res.status(200).send({ token, email: user.email, id: user.id });
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    return next(error);
  }
});
