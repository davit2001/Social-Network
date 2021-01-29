const mongoose=require("mongoose")

let Schema=mongoose.Schema
const PostSchema=new Schema({
    text:{
        type: String
    },
    author:{
        type: Schema.Types.ObjectId, 
        ref: 'userschema',
    },
    photo:{
      type:String  
    },
    time: {
        type: String
    }
} ,{timestamps:true})

const PostModel = mongoose.model("Post",PostSchema)
module.exports = PostModel;