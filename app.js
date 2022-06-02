const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");
const config = require("./services/config");

// Set Static Folder
app.use('/uploads', express.static('uploads'));


//-------------------------------------DATABASE CONNECTIVITY--------------------------------------
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then(
  (db) => {
    console.log("***DB Connected!***");
  },
  (err) => {
    console.log(err);
  }
);


//-------------------------------------Define Routes--------------------------------------
app.use('/auth', require('./routes/auth'));
app.use('/verify', require('./routes/verify'));
app.use('/store', require('./routes/store'));
app.use('/conversation', require('./routes/conversations'));
app.use('/message', require('./routes/messages'));
app.use('/cryptoRequest', require('./routes/cryptoRequests'));


//-------------------------------------Socket.io for Chat--------------------------------------
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if(user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});


//-------------------------------------Server Listening on PORT--------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
