const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require("../models/Admin");
const User = require("../models/User");
const ReferalCode = require('../models/ReferalCode')
const auth = require('../services/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { Auth, LoginCredentials } = require("two-step-auth");
let referralCodeGenerator = require('referral-code-generator')


// @route    GET auth/adminLogin/
// @desc     Admin Login
router.post('/adminLogin',
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const admin = await Admin.findOne({ email })
      if (!admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = admin.password === password;
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      res.json(admin)

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


// @route    GET auth/adminLogin/
// @desc     Update Admin Credentials
router.post('/adminUpdate',
  async (req, res) => {
    try {
      const { id, email, password } = req.body;
      const admin = await Admin.findOneAndUpdate({
        _id: id
      }, {
        email: email,
        password: password
      });
      res.json(admin)

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


// @route    GET auth/updatePassword/
// @desc     Update Password in response to Forgot Password
router.post('/updatePassword',
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOneAndUpdate({
        email: email
      }, {
        password: password
      });
      res.json(admin)

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });



// @route    GET auth/findAccount/
// @desc     Find Account in response to forgot password and send email for OTP
router.post('/findAccount',
  async (req, res) => {
    try {
      const { email } = req.body;
      const account = await Admin.findOne({
        email: email
      });
      if (account) {
        const emailRes = await Auth(req.body.email, "tikturbo");
        const send = {
          code: emailRes.OTP,
          status: true
        }
        res.json(send)
      }
      else {
        res.json('Account Not Found !')
      }

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

// @route    GET /auth/user/
// @desc     User Login or Create Account in DB if not existing
router.post("/user", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username }).select("-password");
    if (user) {
      res.json(user);
    } else {

      const user = new User({
        username: username,
        password: password,
        diamonds: 0
      });
      await user.save();
      res.json(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



// @route    GET auth/invite/
// @desc     User Invitation: Generate a referal code
router.post('/invite',
  async (req, res) => {
    try {
      const { id } = req.body;

      const code = referralCodeGenerator.alphaNumeric('uppercase', 2, 2)
      
      const fields = {
        userFrom: id,
        referalCode: code
      }

      let addDoc = await ReferalCode.findOneAndUpdate(
        { userFrom: id },
        { $set: fields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return res.json(addDoc)

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


// @route    GET auth/acceptReferalCode/
// @desc     User Accepts invitation
router.post('/acceptReferalCode',
async (req, res) => {
  try {
    const { id, referalCode } = req.body;
    
    let addDoc = await ReferalCode.findOneAndUpdate(
      { userFrom: id },
      { $set: fields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json(addDoc)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    GET auth/users/
// @desc     Get All USERS
router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
