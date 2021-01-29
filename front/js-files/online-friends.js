/* eslint-disable */
let socket = io()

const activeFriendUl = document.getElementById('people-list')
const Logout = document.querySelector('#Logout')

const chatBox = document.querySelector('.chat-box')
const chatUserName = document.querySelector('.chatUserName')
const chatMessage = document.querySelector('.text-box')
const messageText = document.getElementById('messageText')
const messageUl = document.querySelector('#messageUl')

let userId = localStorage.getItem('userId')
function newUserConnected() {
    socket.emit('newUser', userId)
}
newUserConnected()


let writeToUser = null;
function writeWhom(whom) { 
    writeToUser = whom.id;
}

socket.on('onlineUsers', (data) => {
    outputOnlineUsers(data);
})


function outputOnlineUsers(data) {
    activeFriendUl.innerHTML = ''
    activeFriendUl.innerHTML = `${data.map(user => `
    <li class='friend' onclick="writeWhom(this)" id=${user._id}>
		 <figure>
			<img src="images/resources/${user.profilePhotos}" alt="">
				<span class="status f-online"></span>
		 </figure>
			<div class="friendz-meta">
				<a href="/profile/${user._id}">${user.name}</a>
			</div>
	</li>
    `).join('')}`
    for (let elem of activeFriendUl.childNodes) {
        elem.addEventListener('click', () => {
            let userid = elem.id;
            socket.emit('openChat', userid)
        })
    }
}

Logout.addEventListener('click', (err) => {
    if (err) {
        console.log("error on logOut:", err);
    }
    alert('Log out')
    let userId = localStorage.getItem('userId')
    socket.emit('Offline', userId)
    location.reload();
})




    //allUserUl  await `${data.arrayOfUsers.map(user=>{
    //    `<li id=${user._id}>${user.name}</li>`
    // }).join('')}`
     //`${data.map(user => `<li class='friend' onclick="writeWhom(this)" id=${user._id}>${user.name}</li>`).join('')}`
   
   




// function sendMsg(e) {
//     e.preventDefault()
//     let msg = messageText.value
//     let obj = {
//         from: userId,
//         to: writeToUser,
//         text: msg
//     }
//     socket.emit('message', obj)
// }



/* erb vor click es anum online user i vra */
// socket.on('openChat', ({ setUser, userId }) => {
//     chatBox.classList.add('show')
//     chatUserName.innerHTML = setUser.name

// })

// socket.on('messagePrivate', ({ user, data }) => {
//     alert(1);
//     outputMessage(user, data)
// })

// function outputMessage(user, msg) {
//     let userBrowser = localStorage.getItem('userId')
//     if (userBrowser === msg.from) {
//         let p = document.createElement('p')
//         p.innerHTML = user.name
//         let li = document.createElement('li')
//         let span = document.createElement('span')
//         span.className = 'chat-message-item'
//         span.innerHTML = msg.text
//         li.className = 'me'
//         li.append(span)
//         messageUl.append(p)
//         messageUl.append(li)
//         messageText.value = msg.text
//         messageText.focus()
//     } else {
//         let p = document.createElement('p')
//         p.innerHTML = user.name
//         let li = document.createElement('li')
//         let span = document.createElement('span')
//         span.className = 'chat-message-item'
//         span.innerHTML = msg.text
//         li.className = 'you'
//         li.append(span)
//         messageUl.append(p)
//         messageUl.append(li)
//         messageText.value = msg.text
//         messageText.focus()
//     }
// }







