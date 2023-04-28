const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretjwtToken="MynameisZohaibistudyinUniversityOfLahore"
router.post(
  "/createuser",
  // username must be an email
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),

  // password must be at least 5 chars long
  body("password", "incorrect password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);
    try {
      let user = await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: user });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

// Login------------------------
router.post(
  "/loginuser",
  body("email").isEmail(),

  // password must be at least 5 chars long
  body("password", "incorrect password").isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "incorrect data" });
      }
      let pwdCompare=await bcrypt.compare(req.body.password,userData.password)
      if (!pwdCompare) {
        return res.status(400).json({ errors: "incorrect password" });
      }
      // if (req.body.password !== userData.password) {
      //   return res.status(400).json({ errors: "incorrect password" });
      // }
      const data={
        user:{
          id:userData.id
        }
      }
      const authToken=jwt.sign(data,secretjwtToken)
      res.json({ success: true,authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
