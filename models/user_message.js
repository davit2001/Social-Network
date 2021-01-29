const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'userschema',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'userschema',
    required: true,
  },
  text: {
    type: String,
    required: true,
  }
},{timestamps:true});

const userMessagesModel = mongoose.model("usermessage", MessageSchema);
module.exports = userMessagesModel;