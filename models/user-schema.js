const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    birth: {
        type: Date,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    message: [{
        type: Schema.Types.ObjectId,
        ref: 'message',
    }],
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'post',
    }],
    friend: [{
        type: Schema.Types.ObjectId,
        ref: 'userschema'
    }],
    photo: [],
    profilePhotos: {
        type: String,
    },
    friendRequest: [{
        type: Schema.Types.ObjectId,
        ref: 'userschema'
    }],
    online: {
        type: Boolean
    }
}, { timestamps: true })

const User = mongoose.model('userschema', userSchema)
module.exports = User