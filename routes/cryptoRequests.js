const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');

const CryptoRequest = require('../models/CryptoRequest')
const WithdrawRequest = require('../models/WithdrawRequest')


// @desc     POST CryptoRequests
router.post("/purchase",
  check('diamonds', 'A Number is required !').notEmpty().isNumeric(),
  check('price', 'A Number is required !').notEmpty().isNumeric(),
  check('email', 'Invalid Email Address !').notEmpty().isEmail()
  ,
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      const { id, email, diamonds, price, paymentType, requestType } = req.body;

      const newDoc = new CryptoRequest({
        userId: id,
        email: email,
        diamonds: diamonds,
        price: price,
        paymentType: paymentType,
        requestType: requestType
      });

      await newDoc.save();

      res.json(newDoc)

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


// @desc     POST Withdrawl Request
router.post("/withdraw",
  check('amount', 'A Number is required !').notEmpty().isNumeric(),
  check('cryptoAddress', 'Crypto Address is Required !').notEmpty()
  ,
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      const { id, cryptoAddress, amount } = req.body;

      const newDoc = new WithdrawRequest({
        userId: id,
        amount: amount,
        cryptoAddress: cryptoAddress
      });

      await newDoc.save();

      res.json(newDoc)

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


// @route    GET auth/admin/
// @desc     Get admin
router.post("/paybywallet", async (req, res) => {
  try {
    const { user, count } = req.body;

    /// Deduct from user wallet
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});




module.exports = router;
