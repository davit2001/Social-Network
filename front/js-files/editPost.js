const socket = io()

const editButton = document.querySelector('.editButton')
const editPost = document.querySelector('.editPost')
const editText = document.getElementById('editText')
const editPostImgDiv = document.querySelector('.editPostImgDiv')
const editPostImg = document.getElementById('editPostImg')
const removeEditPostImage = document.querySelector('.edit-remove-image')

 /* Get Post  */
function editPostFunc(postId) {
    fetch('/getPostInfo',{
        method: "POST",
        headers: {
            'content-type':"application/json"
        },
        body: JSON.stringify({
            PostId: postId.id
        })
    })
    .then(res=>res.json())
    .then(data=>{
        let {post} = data
        editPost.id = postId.id
          if (post.text) {
             editText.innerHTML = post.text
           } 
           if (post.photo) {
            editPostImg.src= '/images/resources/'+post.photo
            editPostImgDiv.hidden = false
        }
        
  })
    editPost.hidden = false;
    document.body.style.overflowY = 'hidden'
}



cancelPost.addEventListener('click',()=>{
    document.body.style.overflowY = 'auto'
    editText.innerHTML = ''
    editPostImgDiv.hidden = true;
    editPostImg.src = ""
    editPost.hidden = true;
    
})

savePost.addEventListener('click',()=>{
    if(editPostImg.getAttribute('src') == '' && editText.value == '') {
        alert('Fileds can\'t be empty')
        return;
    }

    

  /* Edit Post */
    fetch('/savePostInfo',{
        method: "POST",
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({
            PostId: editPost.id,
            photo: editPostImg.getAttribute('src').split('/images/resources/').join(''),
            text: editText.value
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.status == 'ok') window.location.reload()
    })
    document.body.style.overflowY = 'auto';
    editPostImg.src = ""
    editPostImgDiv.hidden = true;
    editPost.hidden = true;
})

removeEditPostImage.addEventListener('click',()=>{
    editPostImg.src = ""
    editPostImgDiv.hidden = true
})

/* Delete Post */
 
 function deletePost(postId){
   fetch('/deletePostInfo',{
       method: "POST",
       headers: {
           "content-type": "application/json"
       },
       body: JSON.stringify({PostId:postId.id})
   }).then(res=>res.json())
   .then(data=>{
       if(data.status == 'ok') window.location.reload()
   })
 }