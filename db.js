const mongoose = require('mongoose')
const url = 'mongodb+srv://Davit2001:david440787@cluster0.tgmmt.mongodb.net/SocialNetwork?authSource=admin&replicaSet=atlas-rxigiy-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
//Arsen mongodb+srv://ADR:socialnetwork@cluster0.duqbf.mongodb.net/network?retryWrites=true&w=majority
//Davit mongodb+srv://Davit2001:david440787@cluster0.tgmmt.mongodb.net/SocialNetwork?authSource=admin&replicaSet=atlas-rxigiy-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
mongoose.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('connected to database')
    }
)