
function f() {
    let userId = localStorage.getItem('userId')
    const fileField = document.querySelectorAll('input[type="file"]')[1];
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
