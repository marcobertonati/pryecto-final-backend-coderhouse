console.log("Login.js working!");

const getCookie = document.cookie;

const nameUser = getCookie.slice(13);
const userSessionDiv = document.getElementById("user-session");
userSessionDiv.innerHTML = `<div class="col">Esta info ingresa por la cookie: ${nameUser}</div>`;
