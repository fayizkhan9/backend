const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const StoreDiamonds = require("../models/StoreDiamonds");
const HashTags = require("../models/HashTags")
const DiamondSale = require("../models/DiamondSale");
const Exchange = require("../models/Exchange");
const ShareableLinks = require("../models/ShareableLinks");
const PerDiamondPrice = require("../models/PerDiamondPrice");
const DiamondsPerFollow = require("../models/DiamondsPerFollow");
const Offers = require("../models/Offers");

//// Store files using multer
var multer = require("multer");
var path = require("path");


////////////////////////////////////////////////////
//////////////////////// APIS //////////////////////
////////////////////////////////////////////////////


// @route    GET /store/addDiamond/
// @desc     Admin adds diamonds for sale

router.post("/addDiamonds"
  ,
  check('count', 'A Number is required !').notEmpty().isNumeric(),
  check('price', 'A Number is required !').notEmpty().isNumeric()
  , async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { count, price } = req.body;
      const addNew = new StoreDiamonds({
        count: count,
        price: price,
      });
      await addNew.save();
      res.json(addNew);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


// @route    GET /store/editDiamonds/
// @desc     Edit Diamonds
router.post("/editDiamonds"
  ,
  check('count', 'A Number is required !').notEmpty().isNumeric(),
  check('price', 'A Number is required !').notEmpty().isNumeric()
  , async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id, count, price } = req.body;

      const update = await StoreDiamonds.findOneAndUpdate(
        { _id: id },
        {
          count: count,
          price: price
        }
      )

      const diamonds = await StoreDiamonds.find();
      res.json(diamonds)
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


// Delete Diamonds
router.delete("/deleteDiamonds/:id", async (req, res) => {
  try {
    const deleted = await StoreDiamonds.findOneAndDelete({ _id: req.params.id })
    const data = await StoreDiamonds.find()
    res.json(data);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    GET /store/addHashTags/
// @desc     Admin adds hashtags
router.post("/addHashTags"
  ,
  check('tags', 'Tags can not be empty !').notEmpty(),
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { tags } = req.body;
      const addNew = new HashTags({
        tags: tags
      });
      await addNew.save();
      res.json(addNew);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

// @route    GET /store/getHashTags/
// @desc     Get All HashTags
router.get("/getHashTags", async (req, res) => {
  try {
    const tags = await HashTags.find();
    res.json(tags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    GET /store/getHashTags/
// @desc     Edit HashTagas
router.post("/editHashTags", async (req, res) => {
  try {
    await HashTags.findOneAndUpdate({ _id: req.body.id }, {
      tags: req.body.tags
    })

    const tags = await HashTags.find()
    res.json(tags);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete tags
router.delete("/deleteHashTags/:id", async (req, res) => {
  try {
    const deleted = await HashTags.findOneAndDelete({ _id: req.params.id })
    console.log(deleted)
    const tags = await HashTags.find()
    res.json(tags);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    GET /store/sale/
// @desc     User adds diamonds for either sale or purchase request

router.post("/sale", async (req, res) => {
  try {
    const { user, count, price, type } = req.body;
    const addNew = new DiamondSale({
      user: user,
      count: count,
      price: price,
      type: type
    });
    await addNew.save();
    res.json(addNew);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

///// Admine define prices for ( rate of diamond, diamonds per follow, remove ads)
router.post('/definePrices', async (req, res) => {
  try {
    const { type, price } = req.body;

    const fields = {
      price: price
    }

    let addDoc = await PerDiamondPrice.findOneAndUpdate(
      { type: type },
      { $set: fields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json(addDoc)

  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
})


// @route    GET /store/getDiamondRate/
// @desc     Get All PerFollowDiamonds
router.get("/getDiamondRate", async (req, res) => {
  try {
    const diamonds = await PerDiamondPrice.findOne({
      type: "diamondPrice"
    });
    res.status(200).json(diamonds);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    GET /store/perFollowDimonds/
// @desc     Addmins adds Per Follow Diamonds
router.post("/diamondsPerFollow", async (req, res) => {
  try {
    const { diamonds } = req.body;

    const fields = {
      diamonds: diamonds
    }

    let addDoc = await DiamondsPerFollow.findOneAndUpdate(
      { type: "diamondsPerFollow" },
      { $set: fields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json(addDoc)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    GET /store/getDiamonds/
// @desc     Get All PerFollowDiamonds
router.get("/getDiamondsPerFollow", async (req, res) => {
  try {
    const diamonds = await DiamondsPerFollow.find();
    res.json(diamonds);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



// @route    GET /store/exchange/
// @desc     Admin Adds Followers For Exchange of Money
router.post("/exchange", async (req, res) => {
  try {
    const { count, price } = req.body;
    const addNew = new Exchange({
      count: count,
      price: price,
    });
    await addNew.save();
    res.json(addNew);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    GET /store/getDiamonds/
// @desc     Get All Diamonds
router.get("/getDiamonds", async (req, res) => {
  try {
    const diamonds = await StoreDiamonds.find();
    res.json(diamonds);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    PSOT /store/links/
// @desc     Save Shareable Links
router.post("/addLinks", async (req, res) => {
  try {
    const exists = await ShareableLinks.find();

    if (exists.length > 0) {
      const update = await ShareableLinks.findOneAndUpdate(
        { _id: exists[0]._id.toString() },
        {
          links: req.body
        }
      )
      res.json(update)
    }
    else {
      const newList = new ShareableLinks({
        links: req.body
      })
      await newList.save();
      res.json(newList);
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET /store/links/
// @desc      Get shareable links
router.get("/getLinks", async (req, res) => {
  try {

    const links = await ShareableLinks.find();
    res.json(links)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    GET /store/offers/
// @desc     Save Offers
router.post("/offers"
  ,
  check('diamonds', 'A Number is required !').notEmpty().isNumeric(),
  check('followers', 'A Number is required !').notEmpty().isNumeric(),
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      const { diamonds, followers } = req.body;

      console.log(req.body)
      const addNew = new Offers({
        diamonds: diamonds,
        followers: followers
      })
      await addNew.save();
      res.json(addNew)

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


router.get("/getOffers", async (req, res) => {
  try {

    const offers = await Offers.find();
    res.json(offers)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    GET /store/editOffers/
// @desc     Edit OFfers

router.post("/editOffers"
  ,
  check('diamonds', 'A Number is required !').notEmpty().isNumeric(),
  check('followers', 'A Number is required !').notEmpty().isNumeric()
  , async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id, diamonds, followers } = req.body;

      await Offers.findOneAndUpdate(
        { _id: id },
        {
          diamonds: diamonds,
          followers: followers
        }
      )

      const data = await Offers.find();
      res.json(data)
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

// Delete Offers
router.delete("/deleteOffers/:id", async (req, res) => {
  try {
    await Offers.findOneAndDelete({ _id: req.params.id })
    const data = await Offers.find()
    res.json(data);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



// @route    GET /store/p2pexchange/
// @desc     P2P Exchange Between 2 users
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
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Invalid Document Type!");
  }
}

router.post("/p2pexchange", upload.single("file"), async (req, res) => {
  try {
    const { sender, reciever, count, cryptoAddress, type } = req.body;
    const addNew = new Exchange({
      sender: sender,
      reciever: reciever,
      diamondsCount: count,
      cryptoAddress: cryptoAddress,
      path: req.file.path,
      type: type
    });
    await addNew.save();
    res.json(addNew);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
