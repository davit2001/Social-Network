const User = require("../models/user-schema");
const userMessage = require("../models/user_message");
async function showAllUsers(req, res) {
  try {
    let result = await User.find();
    res.json({ arrayOfUsers: result });
  } catch (err) {
    console.log("Error on adminRouter showAllUsers:", err);
  }
}

async function deleteUser(req, res) {
  try {
    await User.deleteOne({ _id: req.body.userId });
    res.json({ info: "deleted" });
  } catch (err) {
    throw new Error("Error on deleteing user:", err);
  }
}

async function showFriends(req, res) {
  try {
    let result = await User.findById(req.body.userId);
    let setFriendArray = new Set();
    for (let x of result.friend) {
      setFriendArray.add(`${x}`);
    }
    let friendArray = [];
    for (let id of setFriendArray) {
      try {
        let result = await User.findById(id).select({ name: 1, email: 1 });
        friendArray.push(result);
      } catch (err) {
        console.log("Error on finding friends", err);
        throw new Error("Error on setFriendArray finding friends");
      }
    }
    res.json({ data: friendArray });
  } catch (err) {
    console.log("Error on showFriends", err);
    throw new Error("Error on showFriends:", err);
  }
}

async function showUserMessages(req, res) {
  try {
    console.log(req.body.userId);
    let result = await User.findOne({ _id: req.body.userId }).populate({
      path: "message",
      model: userMessage,
      select: "createdAt text",
      populate: {
        path: "to",
        model: User,
        select: "name",
      },
    });
    res.json({ arrayOfMessages: result.message });
  } catch (err) {
    console.log("Error on showUserMessages", err);
    throw new Error("Error on showUserMessages");
  }
}

async function updateUser(req, res) {
  try {
    console.log(req.body);
    await User.updateOne({ _id: req.body.id }, { $set: req.body.obj });
    res.json({ done: true, info: "User updated" });
  } catch (err) {
    console.log("Error on update User", err);
    throw new Error("Error on update User");
  }
}

module.exports = {
  showAllUsers,
  deleteUser,
  showFriends,
  showUserMessages,
  updateUser,
};
