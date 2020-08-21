const router = require("express").Router();
const bcrypt = require("bcrypt");
const generateToken = require('../utils/generate-token')
const Users = require("./auth-model");

router.post("/register", (req, res) => {
  // implement registration
  const hash = bcrypt.hashSync(req.body.password, 8);

  const newUser = {
    ...req.body,
    password: hash,
  };

  Users.addUser(newUser)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err.message);
    });
});

router.post("/login", (req, res) => {
  // implement login
  Users.findByUsername(req.body.username)
    .then((user) => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ user, token });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err.message);
    });
});



module.exports = router;
