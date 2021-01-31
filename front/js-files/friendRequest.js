// /* eslint-disable */

const FriendRequestUl = document.getElementById('FriendRequest')

const FriendRequestCount = document.getElementById('FriendRequestCount')
const socket = io()

function GetFriendReqest() {
    fetch('/friendRequest', {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(async data => {

            let { FriendRequestList } = await data
            await outputFriendRequest(FriendRequestList)

        }).catch(err => {
            console.log(err)
        })
}
GetFriendReqest()

function outputFriendRequest(FriendRequestList) {
    FriendRequestCount.innerHTML = FriendRequestList.friendRequest.length
    FriendRequestList.friendRequest.map(user => {
        let li = document.createElement('li')
        li.classList = "FrendRequest"
        let divContainer = document.createElement('div')
        divContainer.className = 'nearly-pepls'
        //user i nkari mas
        let figure = document.createElement('figure')
        let a = document.createElement('a')
        let img = document.createElement('img')
        img.src = `images/resources/${user.profilePhotos}`
        a.append(img)
        figure.append(a)
        divContainer.append(figure)
        li.append(divContainer)
        FriendRequestUl.append(li)

        // user i anun u Friend request i knopkeq@

        let usersDiv = document.createElement('div')
        usersDiv.className = 'pepl-info'
        let H4 = document.createElement('h4')

        // user i anuni vra vor smenq gna ira ej
        let RenderUserPage = document.createElement('a')
        RenderUserPage.innerHTML = user.name
        H4.append(RenderUserPage)
        usersDiv.append(H4)

        //let attr = document.createAttribute('data-ripple')
        let DeleteRequest = document.createElement('a')
        DeleteRequest.className = 'add-butn more-action'
        DeleteRequest.setAttribute('name', 'Delete')
        //DeleteRequest.setAttributeNode(attr)
        DeleteRequest.innerHTML = 'delete Request'
        DeleteRequest.id = user._id
        let ConfirmRequest = document.createElement('a')
        ConfirmRequest.className = 'add-butn'
        ConfirmRequest.setAttribute('name', 'Confirm')
        ConfirmRequest.innerHTML = 'Confirm'
        ConfirmRequest.id = user._id
        //ConfirmRequest.setAttributeNode(attr)

        usersDiv.append(DeleteRequest)
        usersDiv.append(ConfirmRequest)
        divContainer.append(usersDiv)
    })
    ClickDeleteOrConfirm(FriendRequestList)
}
function ClickDeleteOrConfirm(FriendRequestList) {

    const Delete = document.getElementsByName('Delete')
    const Confirm = document.getElementsByName('Confirm')
    const FrendRequestLi = document.querySelectorAll('.FrendRequest')

    // Frienq Request Confirm 
    for (let i = 0; i < Confirm.length; i++) {
        Confirm[i].addEventListener('click', () => {
           /* fetch server to delete that frienq request and add that user 
            in a friends
            */
            fetch('/ConfirmFrienqRequest', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    from: localStorage.getItem('userId'),
                    to: Confirm[i].id
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(document.getElementById('FriendRequestCount'))
                    if (data.message) {
                        console.log(data)
                        socket.emit('ConfirmRequest', data.info)
                        alert(data.message)
                        FrendRequestLi[i].remove()
                     
                    }
                })
        })
    }

    // Delete Friend request 
    for (let i = 0; i < Delete.length; i++) {
        Delete[i].addEventListener('click', () => {
            fetch('/DeleteFrienqRequest', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    from: localStorage.getItem('userId'),
                    to: Delete[i].id
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.message) {
                        alert(data.message)
                        FrendRequestLi[i].remove()
                    }
                })
        })


    }
}
