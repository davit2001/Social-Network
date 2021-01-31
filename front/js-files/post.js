const imgFile = document.getElementById('file')
const PostImgDiv = document.querySelector('.PostImgDiv')
const PostImg = document.getElementById('PostImg')
const removeImageButton = document.querySelector('.remove-image')
const imageInput = document.getElementById('imageInput')

let PostSubmit = document.getElementById('PostSubmit')
let postText = document.getElementById('postText')


imgFile.addEventListener("change",()=>{
    let link=URL.createObjectURL(imgFile.files[0])
     PostImg.src=link
     PostImgDiv.hidden = false
})


removeImageButton.addEventListener('click',()=>{
    PostImg.src = ''
    imgFile.value = ''
    PostImgDiv.hidden = true
})


/* send post  */
PostSubmit.addEventListener('click',(e)=>{
  e.preventDefault()
  
let userId = localStorage.getItem('userId')

let fileField;
if (document.querySelectorAll('input[type="file"]').length == 1) {
  fileField = document.querySelector('input[type="file"]')
} else {
  fileField = document.querySelectorAll('input[type="file"]')[1]
}

if (fileField.files[0] == undefined && postText.value == '') {
  alert('Dashter@ datark e')
} else {
  PostImg.src = ''
  
  PostImgDiv.hidden = true
  const formData = new FormData();
  formData.append('edit', fileField.files[0]);
  formData.append("userId", userId)
  formData.append("postText",postText.value)

  postText.value = ''
  postText.focus()
  
  fetch('/editPost', {
        method: 'POST',
         body:formData
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.error('Error:', error);
        });
        imgFile.value = ''
    }
})


let PostForm = document.getElementById('PostForm') 



  /* show post */
  let postConatiner = document.getElementById('postConatiner')
  socket.on('new post',data=>{
   postConatiner.insertAdjacentHTML('afterbegin',`
     <div class="central-meta item" >
     <div class="user-post">
       <div class="friend-info">
         <figure>
           <img width = "60px" height = "60px" src="/images/resources/${data.author.profilePhotos}" alt="">
         </figure>
         <div class="friend-name">
           <ins><a id="${data._id}" href="/profile/${data.author._id}" title="">${data.author.name}</a></ins>
           <span>published: ${data.time}</span>
           <button id="${data._id}" class="editButton" onclick="editPostFunc(this)"><i class='far fa-edit'></i></button>
					 <button id="${data._id}" class="deleteButton" onclick="deletePost(this)"><i class="far fa-trash-alt"></i></button>
         </div>
         <div class="post-meta">
             <div class="description">
           <p>${data.text}</p>
           </div>
           
         </div>
         ${data.photo && `<img width = "400px" height = "300px" src="/images/resources/${data.photo}"> `}
       </div>
     </div>
   </div>
   `)
   })

   