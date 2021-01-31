const allUserUl = document.getElementById('followers')
const AddFriendButton = document.querySelectorAll('.friend-meta')
const FriendsCount = document.getElementById('FriendsCount')
const FriendsButton = document.getElementById('FriendsButton')




fetch("/getSocialUser", {
    method: "post",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: localStorage.getItem("userId") }),
}).then(res => res.json())
    .then(async data => {
        let {socialUsers,user} = data
        await outputAllUsers(socialUsers)
 })

async function outputAllUsers(socialUsers) {
    for (let user of socialUsers) {
        let li = document.createElement('li')
        let figure = document.createElement('figure')
        let img = document.createElement('img')
        let div = document.createElement('div')
        let h4 = document.createElement('h4')
        let AddFriend = document.createElement('a')
        let ViewProfileLink = document.createElement('a')
        img.src = `images/resources/${user.profilePhotos}`
        figure.append(img)
        li.append(figure)
        li.id = user._id

        div.className = "friend-meta"
        ViewProfileLink.href = `profile/${user._id}`
        ViewProfileLink.innerHTML = user.name
        h4.append(ViewProfileLink)
        div.append(h4)
        AddFriend.innerHTML = 'Add Friend'
        AddFriend.className = 'underline'
        div.append(AddFriend)
        li.append(div)
        allUserUl.append(li)
    }
    await sendUserIdToFriend()
}
function sendUserIdToFriend() {
    for (let i = 0; i <  allUserUl.childNodes.length; i++) {
     allUserUl.childNodes[i].addEventListener('click',()=>{
            alert('You send friend Request')
            let userId = localStorage.getItem('userId')
            let data = {
            from: userId,
            to: allUserUl.childNodes[i].id
          }
          socket.emit('friendRequest',data) 
        })
    }
}
socket.on('friendRequest',(data)=>{
 let FriendsButton = document.getElementById('FriendsButton')
 let span = document.createElement('span')
 span.id = "FriendsCount"
 span.innerHTML = data.length
 FriendsButton.append(span)
})

socket.on('friendRequestFailed', () => {
    alert('You already send frienq request')
})

socket.on('ConfirmRequest',(data)=>{
    alert(`${data} accept your friend request `)
  })

  