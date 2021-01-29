const PostModel = require("../models/PostModel");
const User = require("../models/user-schema");

const { checkPassword } = require("./helper/create_hash")

async function getInfoUser(req, res) {
 try {
    res.json(await User.findById(req.body.userId));
  } catch (err) {
    throw new Error("Error on getInfoUser:", err);
  }
}

async function changePassword(req, res) {
  try {
    let result = await User.findById(req.body.userId);
   let isEqual = await checkPassword(result.password, req.body.oldPassword);
  } catch (err) {
    console.log("Error on updating password", err)
    throw new Error("Error on updating password");
  }
}

async function showSocialUser(req, res) {
  try {
    let userId = req.body.userId;
    let user =  await User.findOne({_id: userId}).exec()
   let socialUsers = await User.find({_id:{$nin:[userId,...user.friend,...user.friendRequest]}}).select({name:1,profilePhotos:1}).exec()
   
   res.json({socialUsers,user})
  } catch (err) {
    throw new Error("Error on showSocialUser");
  }
}

async function  getPostInfo(req, res) {
  let {PostId} = req.body
 let post =  await PostModel.findById(PostId).select({text:1,photo:1})
 res.json({post})
}

async function  savePostInfo(req,res) {

  let {text,photo,PostId} = req.body
 let updatePost = await PostModel.updateOne({"_id":PostId},{$set:{photo,text}})
 res.json({status:'ok'})
}

async function  deletePostInfo(req,res) {
  let {PostId} = req.body
  let deletePost = await PostModel.findByIdAndDelete(PostId)
  res.json({status:'ok'})
}

async function getProfilePhoto(req, res) {
  try {
   let result = await User.findById(req.body.userId).select({profilePhotos: 1 });
    res.json({imageName:result})
  } catch (err) {
    throw new Error("Error on profile photo");
  }
}

module.exports = {
  getInfoUser,
  changePassword,
  showSocialUser,
  getPostInfo,
  savePostInfo,
  deletePostInfo,
  getProfilePhoto
};
