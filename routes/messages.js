const router = require("express").Router();
const Message = require("../models/Message");
const Query = require("../models/Query");

//add
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

///////////////////////// Queries Sent To Admin ///////////////////////

router.post("/query", async (req, res) => {
  try {
    const { user, text } = req.body;
    const newQuery = new Query({
      user: user,
      text: text,
    });
    const savedQuery = await newQuery.save();
    res.status(200).json(savedQuery);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
