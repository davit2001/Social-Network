const imgProfileFile = document.getElementById('imgFile')
const ProfileImg = document.getElementById('ProfileImg')
const showProfilePhoto = document.querySelector('.showProfilePhoto')
const cancelProfilePhoto = document.querySelector('.cancelProfilePhoto')
const saveProfilePhoto = document.querySelector('.saveProfilePhoto')


imgProfileFile.addEventListener("change",()=>{
    let link =  URL.createObjectURL(imgProfileFile.files[0])
    ProfileImg.src= link
    showProfilePhoto.hidden = false
    document.body.style.overflowY = 'hidden'
})

cancelProfilePhoto.addEventListener('click',()=>{
    showProfilePhoto.hidden = true
    document.body.style.overflowY = 'auto'
    ProfileImg.src = ''
})

saveProfilePhoto.addEventListener('click',()=>{
    showProfilePhoto.hidden = true
    document.body.style.overflowY = 'auto'
    ProfileImg.src = ''
    f()
    window.location.reload()
})

function f() {
    let userId = localStorage.getItem('userId')
    const fileField = document.querySelectorAll('input[type="file"]')[0];
    const formData = new FormData();
 
    formData.append('edit', fileField.files[0]);
    formData.append("userId", userId)
   
    fetch('/editProfileImg', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            return response.json()
        })
        .then(result => {
             const img = document.querySelector("#img")
              img.src = `/images/resources/${result.imageName.profilePhotos}`
          })
        .catch(error => {
            console.error('Error:', error);
        });

        
}

 

