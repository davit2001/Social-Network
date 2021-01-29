

const editButton = document.querySelector('.editButton')
const editPost = document.querySelector('.editPost')
const editText = document.getElementById('editText')
const PostImgDiv = document.querySelector('.PostImgDiv')
const PostImg = document.getElementById('PostImg')
const removeImageButton = document.querySelector('.remove-image')

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
        editPost.id = info.id
          if (post.text) {
             editText.innerHTML = post.text
           } 
           if (post.photo) {
            PostImg.src= '/images/resources/'+post.photo
            PostImgDiv.hidden = false
        }
        
  })
    editPost.hidden = false;
    document.body.style.overflowY = 'hidden'
}



cancelPost.addEventListener('click',()=>{
    document.body.style.overflowY = 'auto'
    editText.innerHTML = ''
    PostImgDiv.hidden = true;
    PostImg.src = ""
    editPost.hidden = true;
    
})

savePost.addEventListener('click',()=>{
    if(PostImg.getAttribute('src') == '' && editText.value == '') {
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
            photo: PostImg.getAttribute('src').split('/images/resources/').join(''),
            text: editText.value
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.status == 'ok') window.location.reload()
    })
    document.body.style.overflowY = 'auto';
    PostImg.src = ""
    PostImgDiv.hidden = true;
    editPost.hidden = true;
})

removeImageButton.addEventListener('click',()=>{
    PostImg.src = ""
    PostImgDiv.hidden = true
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