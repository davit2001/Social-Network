/* eslint-disable */
let socket = io(),
chatWith = null, // friendId
user = null, //user info from databasa
friend = null //friend info from databasa


function newUserConnected() {
    let userId = localStorage.getItem('userId')
    socket.emit('newUser', userId)
}
newUserConnected()

/* this code work when you click your friend to write message*/
/*
 I send user and friend id and get user and friend information and 
  recive their chat message
*/ 
async function openChat(userTag) {
    fetch('/getFriendInfo',{
       method: 'POST',
       headers: {
        "content-type":"application/json"
       },
       body: JSON.stringify({from:localStorage.getItem('userId'),to:userTag.id})
   }).then(res=>res.json())
   .then(async data=>{
    let ul = document.getElementById("messageContainer");
    ul.innerHTML = ''

    let {Friend,messages,User} = await data
    user = User
    friend = Friend
  
    messages.forEach(message=>{
        let ul = document.getElementById("messageContainer");
    let li = document.createElement("li");
    let browserUser = localStorage.getItem("userId");
    let img = document.createElement("img");
    
    if (browserUser === message.from) {
        li.className = "me";
       img.src = `images/resources/${User.profilePhotos}`;
    } else {
        li.className = "you";
        img.src = `images/resources/${Friend.profilePhotos}`;
    }
    let figure = document.createElement("figure");

    let p = document.createElement("p");
    p.innerHTML = message.text;
   figure.appendChild(img);
    li.appendChild(figure);
    li.appendChild(p);
    ul.appendChild(li);
    })
   
   await outputFriendHeader(Friend)
    
   })
    
}
function  outputFriendHeader(Friend) {
    let hDiv = document.getElementById('hDiv')
    hDiv.hidden = false
   
    let MessageHeader = document.querySelector(".MessageHeader")
       MessageHeader.innerHTML = ''
    let div = document.createElement('div')
    div.className = "conversation-head";

     chatWith = Friend._id
    let figure = document.createElement("figure");
    let img = document.createElement("img");
     img.setAttribute('width','45px')
     img.setAttribute('height','45px')
    img.src = `images/resources/${Friend.profilePhotos}`;
    figure.appendChild(img);
    div.append(figure)
    let span = document.createElement("span");
    span.innerHTML = `${Friend.name} <i>${Friend.online}</i>`;
    div.append(span)
    MessageHeader.prepend(div)
    }

//esi ete uzes karas sharunakes ete che 
// function removeAllChildNodes() {
//     const container = document.querySelector('#hDiv');
//     document.getElementById("messageContainer").innerHTML = "";
//     let count = document.getElementById("hDiv").childElementCount
//     while (count !== 1) {
//         container.removeChild(container.firstChild);
//         --count;
//     }
// }

function sendMsg(e) {
    e.preventDefault();
    
    let obj = {
        from: localStorage.getItem("userId"),
        to: chatWith,
        text: document.getElementById("msgTxt").value
     
    }
    
    document.getElementById("msgTxt").focus()
    if (chatWith === null || obj.text.length === 0) {
        let info = document.getElementById("info");
        info.innerHTML = "Choose anyone that you want to write";

    } else {

   let Obj = {
        newMsg: {
            from: localStorage.getItem("userId"),
            text: document.getElementById("msgTxt").value
        },
         user,
         friend,
  }
    createMsgTag(Obj)
        socket.emit('msgUser', obj);
    }
    document.getElementById("msgTxt").value = "";
}

// function clearMessages() {
//     alert("esi hly serveric chi jnjum sarqac chi liqy baner piti hashvi arnenq es alerty chat.js-i 118-toxuma")
//     // let clearTag = document.getElementById("clear")
//     // let obj = {
//     //     from: localStorage.getItem("userId"),
//     //     to
//     // }
//     // socket.emit("deleteUserMsg",clearTag.value);
//     //removeAllChildNodes();
// }

socket.on("msgUserBack", (data) => {
   createMsgTag(data);
})



function createMsgTag(msg) {
    let {newMsg,user,friend}  = msg
    let ul = document.getElementById("messageContainer");
    let li = document.createElement("li");
    let browserUser = localStorage.getItem("userId");
    let img = document.createElement("img");
    
    if (browserUser === newMsg.from) {
        li.className = "me";
        img.src = `images/resources/${user.profilePhotos}`;
    } else {
        li.className = "you";
        img.src = `images/resources/${friend.profilePhotos}`;
    }
    let figure = document.createElement("figure");

    let p = document.createElement("p");
    p.innerHTML = newMsg.text;
    figure.appendChild(img);
    li.appendChild(figure);
    li.appendChild(p);
    ul.appendChild(li);
}
