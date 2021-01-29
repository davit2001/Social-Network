window.onload = function () {
  loadUsers();
};

function loadUsers() {
  fetch("/admin/showUsers", {
    method: "get",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
     createTagOfUser(data.arrayOfUsers, "tbody");
    });
}

function deleteUser() {
   fetch("/admin/deleteUser", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ userId: getCheckedUserId() }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      alert(data.info);
      window.location.reload();
    });
}

function createTagOfUser(data, where) {
  data.forEach((element) => {
    let tbody = document.getElementById(`${where}`);
    let tr = document.createElement("tr");
    const tdname = document.createElement("td");
    tdname.appendChild(document.createTextNode(element.name));
    const tdsurname = document.createElement("td");
    tdsurname.appendChild(document.createTextNode(element.email));
    const userTag = document.createElement("input");
    userTag.setAttribute("name", "name");
    userTag.setAttribute("value", element._id);
    userTag.setAttribute("type", "radio");
    const tdcheckbox = document.createElement("td");
    tdcheckbox.appendChild(userTag);
    tr.append(tdname, tdsurname, tdcheckbox);
    tbody.appendChild(tr);
  });
}

function showUserFriend() {
  document.getElementById("tbody2").innerHTML = "";
  fetch("/admin/showUserFriend", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ userId: getCheckedUserId() }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      createTagOfUser(data.data, "tbody2");
      document.getElementById("friends").style.display = "inline";
    });
}

function showUserMessage() {
  document.getElementById("tbody3").innerHTML = "";
  fetch("/admin/showUserMessages", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ userId: getCheckedUserId() }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      createTagOfMessages(data.arrayOfMessages, "tbody3");
      document.getElementById("messages").style.display = "inline";
    });
}

function createTagOfMessages(data, where) {
  data.forEach((element) => {
    let tbody = document.getElementById(`${where}`);
    let tr = document.createElement("tr");
    const tdname = document.createElement("td");
    tdname.appendChild(document.createTextNode(element.to.name));
    const tdText = document.createElement("td");
    tdText.appendChild(document.createTextNode(element.text));
    const tdTime = document.createElement("td");
    tdTime.appendChild(document.createTextNode(element.createdAt));
    tr.append(tdname, tdText, tdTime);
    tbody.appendChild(tr);
  });
}

function openForm() {
  document.getElementById("showUpdateForm").style.display = "none";
  document.getElementById("updateUser").style.display = "inline";
}

function updateUser() {
  fetch("/admin/updateUser", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ obj: createUpdateObj(), id: getCheckedUserId() }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!data.done) {
        document.getElementById("updateInfo").innerHTML = "Something wrong";
      }
    });
}

function createUpdateObj() {
  let adminInput = document.querySelectorAll('input[name="update"]');
  let obj = {
    name: adminInput[0].value,
    email: adminInput[1].value,
    phone: adminInput[2].value,
    login: adminInput[3].value,
    password: adminInput[4].value,
  };
  return obj;
}

getCheckedUserId = () => {
  let id;
  const user = document.querySelectorAll('input[name="name"]');
  user.forEach((data) => {
    if (data.checked) {
      id = data.value;
    }
  });
  return id;
};
