"use strict";

// account Exist ? log in : sign up
// get sign up btn

const btnLogIn = document.getElementById("log_in-btn");
const btnNew = document.getElementById("new-btn");
const containerEl = document.querySelector(".container");
const modalEl = document.querySelector(".modal-container");
const overlayEl = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

btnNew.addEventListener("click", () => {
  modalEl.classList.remove("hidden");
  overlayEl.classList.remove("hidden");
  containerEl.classList.add("hidden");
});

function closeModal() {
  modalEl.classList.add("hidden");
  overlayEl.classList.add("hidden");
  containerEl.classList.remove("hidden");
}

btnCloseModal.addEventListener("click", closeModal);

overlayEl.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Sign up

// Selecting elements
const firstNameEl = document.getElementById("first-name");
const surnameEl = document.getElementById("surname");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const dateEl = document.getElementById("date");
const monthEl = document.getElementById("month");
const yearEl = document.getElementById("year");
const defaultDayEl = document.getElementById("default-day");
const defaultMonthEl = document.getElementById("default-month");
const defaultYearEl = document.getElementById("default-year");
const btnSubmit = document.getElementById("submit-btn");

//Modify date, month and year Element
const date = new Date();

let year = date.getFullYear();
let monthInNumber = date.getMonth() + 1;
let day = date.getDate();
let month = "";

switch (monthInNumber) {
  case 1:
    month = "Jan";
    break;
  case 2:
    month = "Feb";
    break;
  case 3:
    month = "Mar";
    break;
  case 4:
    month = "Apr";
    break;
  case 5:
    month = "May";
    break;
  case 6:
    month = "Jun";
    break;
  case 7:
    month = "Jul";
    break;
  case 8:
    month = "Aug";
    break;
  case 9:
    month = "Sep";
    break;
  case 10:
    month = "Oct";
    break;
  case 11:
    month = "Nov";
    break;
  case 12:
    month = "Dec";
    break;
}

for (let i = 1; i <= 31; i++) {
  dateEl.innerHTML += `<option class="${
    i === day ? "default-day" : ""
  }" value="${i}">${i}</option>`;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

for (let i = 0; i < 12; i++) {
  monthEl.innerHTML += `<option class="${
    months[i] === month ? "default-month" : ""
  }" value="${months[i]}">${months[i]}</option>`;
}

for (let i = year; i > 1904; i--) {
  yearEl.innerHTML += `<option class="${
    i === year ? "default-year" : ""
  }" value="${i}">${i}</option>`;
}
dateEl.value = day;
monthEl.value = month;
yearEl.value = year;

//get Id (unique id for users object)
const getId = () => new Date().getTime();
let id = getId();
let isSubmited = false;
let isRegisterd = false;

//Create Array Data User
const dataUsers = [];

function setDatatoLocalStorage() {
  //Set DataUser to LocalStorage
  console.log(JSON.stringify(dataUsers));
  localStorage.setItem("dataUsers", JSON.stringify(dataUsers));
}

// Get DataUser from LocalStorage

const DataUserfromLocalStorage = JSON.parse(localStorage.getItem("dataUsers"));
console.log(DataUserfromLocalStorage);

// Create Constructor function for Users
function User(id, firstName, surname, email, password, dateOfbirth) {
  this.id = id;
  this.firstName = firstName;
  this.surname = surname;
  this.email = email;
  this.password = password;
  this.dateOfbirth = dateOfbirth;
}

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  let newUser = new User(
    getId(),
    firstNameEl.value,
    surnameEl.value,
    emailEl.value,
    passwordEl.value,
    {
      date: dateEl.value,
      month: monthEl.value,
      year: yearEl.value,
    }
  );

  if (!dataUsers.length) {
    dataUsers.push(newUser);
    //Set DataUser to LocalStorage
    setDatatoLocalStorage();
    console.log(dataUsers);
    isSubmited = true;
    resetValue();
    closeModal();
  } else if (dataUsers.length > 0) {
    for (let user of DataUserfromLocalStorage) {
      if (user.email === emailEl.value) {
        alert(`Email ${user.email} has been registered!`);
        isRegisterd = true;
        resetValue();
        break;
      } else {
        dataUsers.push(newUser);
        //Set DataUser to LocalStorage
        setDatatoLocalStorage();
        console.log(dataUsers);
        isSubmited = true;
        resetValue();
        closeModal();
        break;
      }
    }
  }
});

function resetValue() {
  if (isSubmited || isRegisterd) {
    id = "";
    firstNameEl.value = "";
    surnameEl.value = "";
    emailEl.value = "";
    passwordEl.value = "";
    dateEl.value = day;
    monthEl.value = month;
    yearEl.value = year;
  }
}

//handle login

//Selecting element

const emailLoginEl = document.getElementById("login-email");
const passwordLoginEl = document.getElementById("login-password");
const btnLogin = document.getElementById("log_in-btn");

function resetLoginValue() {
  emailLoginEl.value = "";
  passwordLoginEl.value = "";
}

btnLogIn.addEventListener("click", (event) => {
  event.preventDefault();
  const loginUser = DataUserfromLocalStorage.find((item) => {
    return (
      item.email === emailLoginEl.value &&
      item.password === passwordLoginEl.value
    );
  });

  if (loginUser) {
    alert("Log in successfully!");
    resetLoginValue();
  } else {
    console.log(loginUser);
    alert("Log in failed!");
    resetLoginValue();
  }

  // console.log(dataUsers);
  // for (let user of dataUsers) {
  //   if (
  //     user.email === emailLoginEl.value &&
  //     user.password === passwordLoginEl.value
  //   ) {
  //     alert("Log in successfully!");
  //   } else console.log("Log in failed!");
  // }
});

//Password field control
const signupPasswordRevealedEl = document.getElementById("signup-eye-outline");
const signupPasswordHiddenEl = document.getElementById(
  "signup-eye-off-outline"
);
const signupControlPasswordEl = document.querySelector(
  ".signup-control-password"
);
const loginPasswordRevealedEl = document.getElementById("login-eye-outline");
const loginPasswordHiddenEl = document.getElementById("login-eye-off-outline");
const loginControlPassWordEl = document.querySelector(
  ".login-control-password"
);

loginControlPassWordEl.addEventListener("click", () => {
  loginPasswordHiddenEl.classList.toggle("hidden");
  loginPasswordRevealedEl.classList.toggle("hidden");
  loginPasswordHiddenEl.classList.contains("hidden") &&
    passwordLoginEl.setAttribute("type", "text");
  loginPasswordRevealedEl.classList.contains("hidden") &&
    passwordLoginEl.setAttribute("type", "password");
});

signupControlPasswordEl.addEventListener("click", () => {
  signupPasswordRevealedEl.classList.toggle("hidden");
  signupPasswordHiddenEl.classList.toggle("hidden");

  signupPasswordHiddenEl.classList.contains("hidden") &&
    passwordEl.setAttribute("type", "text");
  signupPasswordRevealedEl.classList.contains("hidden") &&
    passwordEl.setAttribute("type", "password");
});
