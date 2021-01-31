
const addFriend = document.querySelector('.addFriend')
const addFriendDiv = document.querySelector('.add-btn')
if(addFriend) {
    addFriend.addEventListener('click',()=>{
        alert('You send friend Request')
        let userId = localStorage.getItem('userId')
        let data = {
        from: userId,
        to: addFriend.id
      }
      socket.emit('friendRequest',data)
      addFriendDiv.hidden = true
    })
   
}

socket.on('friendRequestFailed', () => {
    alert('You already send frienq request')
})



