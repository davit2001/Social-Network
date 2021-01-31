const User = require("../models/user-schema");
const userMessage = require("../models/user_message");

class Message {
 /* add message  */
  async add(msg) {
    
    try {
      let msgUser = new userMessage(msg);
      await msgUser.save();
      let user = await User.findById(msg.from)
      let friend = await User.findById(msg.to)
      let newMsg = await userMessage.findOne({ from: msg.from, to: msg.to, text: msg.text });
     
      user.message.push(newMsg._id);
      await user.save();
      return {newMsg,user,friend}
    } catch (err) {
      console.log("error on save message: ", err);
    }
  }
 /* get chat messages */
  async getAllMessages(obj) {
    let message = await userMessage.find({ $or: [{ from: obj.from, to: obj.chatWith }, { from: obj.chatWith, to: obj.from, }] });
    return message;
  }

}

module.exports = new Message();