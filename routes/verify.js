const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { Auth, LoginCredentials } = require("two-step-auth");

const UserDocs = require("../models/UserDocs");
const EmailVerification = require("../models/EmailVerification");

// Upload Docs for Verification
var multer = require("multer");
var path = require("path");


// @route    GET /verify/email
// @desc     Verify Email
// @access   Private
router.post(
  "/email",
  check("email", "Enter Valid Email Address").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const emailRes = await Auth(req.body.email, "tikturbo");
      res.json(emailRes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


// @route    GET /verify/email
// @desc     Verify Email
// @access   Private
router.post("/emailStatus", async (req, res) => {
  try {
    const status = new EmailVerification({
      user: req.body.user,
      email: req.body.email,
      status: "verified",
    });
    await status.save();
    res.json(status.status)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    GET /verify/doc/
// @desc     Verify Document
// @access   Private
var storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Invalid Document Type!");
  }
}

router.post("/doc", upload.single("file"), async (req, res) => {
  try {
    const file = new UserDocs({
      user: req.body.user,
      path: req.file.path,
    });

    await file.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
