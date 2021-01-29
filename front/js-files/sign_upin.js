let registCode = 0;
function registerUser() {
  if (checkInputParams()) {
    fetch("/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json",
      },

      body: JSON.stringify(createUserObject()),
    }).then((res) => {
      return res.json();
    })
      .then((obj) => {
        console.log(obj);
        if (obj.result) {
          window.location.href = "/login";
        } else {
          document.getElementById("infoEmail").innerHTML = obj.info;
        }
      });
  }
}

function createUserObject() {
  let obj = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phoneNumber").value,
    birth: document.getElementById("birth").value,
    login: document.getElementById("loginRegist").value,
    password: document.getElementById("passwordRegist").value,
    email: document.getElementById("email").value,
    gender: getGender(),
    online: true
  }
  return obj;
}

function getGender() {
  if (document.getElementById("male").checked) {
    return "male";
  } else {
    return "female";
  }
}

/* check  validation in register */
function checkInputParams() {
  /* Name validation */
  let checkName = 0;
  if (!document.getElementById("name").value.length) {
    infoName.innerHTML = "Name is required";
    ++checkName;
  } else if (document.getElementById("name").value.length <= 4) {
    infoName.innerHTML = "Name is too short";
    ++checkName;
  } else {
    checkName = 0;
    infoName.innerHTML = " ";
  }

  /* Phone validation */
  let phoneValid = /^\d{9}$/;
  let checkPhone = 0;
  if (!phoneNumber.value.match(phoneValid)) {
    infoPhone.innerHTML = "Phone number is not valid";
    ++checkPhone;
  } else {
    checkPhone = 0;
    infoPhone.innerHTML = " ";
  }
  /* Birth validation */
  let checkBirth = 0;
  if (!document.getElementById("birth").value.length) {
    infoBirth.innerHTML = "Birth is required";
    ++checkBirth;
  } else {
    checkBirth = 0;
    infoBirth.innerHTML = " ";
  }
  /* Login validation */
  let checkLogin = 0;
  if (document.getElementById("loginRegist").value.length <= 4) {
    infoLogin.innerHTML = "Login must be not less than 5 charachter!";
    ++checkLogin;
  } else {
    checkLogin = 0;
    infoLogin.innerHTML = " ";
  }

  /* Password validation */
  let passValid = /^[A-Za-z]{4,10}$/;
  let checkPassword = 0;
  if (!passValid.test(passwordRegist.value)) {
    infoPassword.innerHTML = "Password must contain only characters and at least 4 charachters";
    ++checkPassword;
  } else {
    checkPassword = 0;
    infoPassword.innerHTML = " ";
  }
  /* Email validation */
  let checkEmail = 0;
  if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value))) {
    infoEmail.innerHTML = "Invalid Email address";

    ++checkEmail;
  } 
   else {
    if (regCode.value == '') {
      infoEmail.innerHTML = "Input Email code";
      return;
    }
    checkEmail = 0;
    infoEmail.innerHTML = " ";
  }
  return (regCode.value == registCode && checkName === 0 && checkPhone === 0 && checkPassword === 0 && checkLogin === 0 && checkBirth === 0 && checkEmail === 0);
}

/* login user and set token  */
function loginUser() {
  let obj = {
    userId: localStorage.getItem('userId'),
    login: document.getElementById("login").value,
    password: document.getElementById("password").value
  }
  fetch("/loginUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      xaccesstoken: localStorage.getItem("authToken"),
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      Accept: "application/json",
    },
    body: JSON.stringify(obj),
  }).then((res) => {
    return res.json();
  })
    .then((obj) => {
     if (obj.log) {
        localStorage.setItem("authToken", obj.token);
        localStorage.setItem("email", obj.email);
        localStorage.setItem("userId", obj.userId);
        sessionStorage.setItem("token", obj.token);
        window.location.href = "./home";
      } else {
        infoLoginUser.innerHTML = obj.info;
      }

    }).catch((err) => {
      console.log(err);
    })
}

/* validate email and email register code  */
function sendEmail(e) {
  fetch("/sendMail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: document.getElementById("email").value,
    }),
  }).then((res) => {
    return res.json();
  })
    .then((obj) => {
     if (!obj.isSend) {
        infoEmail.innerHTML = "Something wrong with Email";
      } else {
        registCode = obj.registrationCode;
      }
    })
  e.preventDefault();
}