const express = require('express')
const { 
    homePage, 
    loginPage, 
    profilePage,
    userFriends,
    userMessages,
    friendRequest,
    aboutPage,
    photoPage 
} = require('../controller/indexController')
const { verifyToken } = require('../middelware/auth')

const router = express.Router()
router.get('/', verifyToken, homePage)
router.get('/home', verifyToken, homePage)
router.get('/profile/:id', verifyToken, profilePage)
router.get('/friends', verifyToken, userFriends)
router.post('/friendRequest', verifyToken, friendRequest)
router.get('/about',verifyToken,aboutPage)
router.get('/photos/:id',verifyToken,photoPage)
router.get('/messages', verifyToken, userMessages)
router.get('/login', loginPage)
module.exports = router
