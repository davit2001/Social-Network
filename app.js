const {http, server,app,express,updateOnlineToTrue,findUser,io} = require('./socket/socket')


const bodyParser = require("body-parser"),
 cookieParser = require("cookie-parser"),
 User = require('./models/user-schema'),
 path = require("path"),
 cons = require('consolidate'),
 moment = require('moment'),
 sharp = require('sharp'),
 multer = require("multer"),
 dotenv = require('dotenv')

 dotenv.config({path:".env"})
const PORT = process.env.PORT || 3080
// controllers & routers

const { ConfirmRequest, DeleteRequest, userMessages } = require('./controller/indexController'),
 userMessagesModel = require('./models/user_message'),
 indexRouter = require('./router/indexRouter'),
 mainRouter = require("./router/main_router"),
 PostModel = require("./models/PostModel"),
 indexController = require("./controller/indexController")

// middlwares
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// for public
app.use(express.static("./front/views"));
app.use(express.static("./front/views/fonts"));
app.use(express.static("./front/views/images"));
app.use(express.static("./front/js-files"));
app.use(express.static(path.join(__dirname, "node_modules")));

app.set('views', path.join(__dirname + '/front', 'views'));
app.set('view engine', 'ejs');
app.set('view options', {
    layout: false
});




// server
server.listen(PORT, () => {
  console.log("server listening port-> 3000");
});

// Restful API`s
app.use('/', indexRouter)

app.post("/registerUser", mainRouter.addUser);

app.post("/loginUser", (req, res) => {
  mainRouter.loginUser(req, res)
  updateOnlineToTrue(req.body.userId);
});

app.post("/sendMail", mainRouter.sendRegistCode);


app.post("/getFriendInfo",async (req,res)=>{
  let {from,to} = req.body
 

let messages = await userMessagesModel.find({$or:[
  {from:from,to:to},
  {from:to,to:from}
]})
 
   let Friend = await findUser(to)
   let User = await findUser(from)
   res.json({Friend,messages,User})
})


app.post("/admin/deleteUser", mainRouter.deleteUser);

app.get("/admin/showUsers", mainRouter.showAllUsers);

app.post("/admin/showUserFriend", mainRouter.showFriends);

app.post("/admin/showUserMessages", mainRouter.showUserMessages);

app.post("/editPassword/changeUserPassword", mainRouter.changePassword);

app.post("/admin/updateUser", mainRouter.updateUser)

app.post("/getSocialUser", mainRouter.showSocialUser);

app.post('/ConfirmFrienqRequest', ConfirmRequest)

app.post('/DeleteFrienqRequest',DeleteRequest)

app.post('/getPostInfo',mainRouter.getPostInfo)

app.post('/savePostInfo',mainRouter.savePostInfo)

app.post('/deletePostInfo',mainRouter.deletePostInfo)

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, 'front/views/images/resources/upload/'));
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage, limits: 2 * 1024 * 1024 });

app.post("/editProfileImg", upload.single('edit'), async (req, res) => {
  
  let userId = req.body.userId
  const file = req.file.filename

  if (!file) {
     const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return (error)
  }

  // cut image with sharp method
  
  let compressImagePath = path.join(__dirname, `front/views/images/resources/${req.file.filename}`)
  let x = sharp(req.file.path)
  .rotate()
  .resize(220,220)
  .toFile(compressImagePath,(err,info)=>{
    if (err) console.log('error',err)
  })

  let user = await findUser(userId)
  
  user.profilePhotos = file;
  user.save();
  res.json({ imageName: file });
})

app.post("/editPost", upload.single('edit'), async (req, res) => {
 let {userId,postText} = req.body
 let user = await findUser(userId)

 if(req.file){ 
   let file=req.file.filename
   let compressImagePath = path.join(__dirname, `front/views/images/resources/${req.file.filename}`)
     let x = sharp(req.file.path)
     .rotate()
     .resize(220,220)
     .toFile(compressImagePath,(err,info)=>{
       if (err) console.log('error',err)
     })
    user.photo.push(file)
 } 
 

  let File = req.file == undefined ? '' : req.file.filename
    let createPost = new PostModel({
       text:postText,
       author: userId,
       photo: File,
       time: moment().format('lll')
     }) 

   createPost.populate('author').execPopulate()
  let newPost = await createPost.save()
   user.post.push(newPost._id)
   user.save();
  io.emit('new post',newPost)
 
})

app.post("/getProfilePhoto", mainRouter.getProfilePhoto )

app.get('/is_admin',(req,res)=>res.render('is_admin'))
app.post('/delete_user',(req,res)=>res.render('delete_user'))
app.post('/update_user',(req,res)=>res.render('update_user'))
app.post('/all_users',(req,res)=>res.render('all_users'))