console.log("ChatPrivate Working!");
const socket = io();

socket.on("list-msg-chat-private", (data) => {
  if (data.length <= 0) {
    const boardChat = document.getElementById("chat-board");
    boardChat.innerHTML = `<h6> No hay mensajes de chat </h6>`;
  } else {
    const boardChat = document.getElementById("chat-board");
    boardChat.innerHTML = ``;
    data.forEach((chat) => {
      boardChat.innerHTML += `<span class="user-chat">${chat.author.id} </span> <span class="date-chat">[${chat.author.date}]:</span> <span class="msg-chat">${chat.text}</span> </br>`;
    });
  }
});

function sendMsgChat() {
  let emailUser = document.getElementById("email").value;

  if (emailUser === "") {
    alert("¡Ingrese un mail!");
  } else {
    let date = new Date().toLocaleString();

    let chatMsg = {
      author: {
        id: document.getElementById("email").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: document.getElementById("age").value,
        alias: document.getElementById("alias").value,
        avatar: document.getElementById("avatar").value,
        date: date,
      },
      text: document.getElementById("message-chat").value,
    };

    socket.emit("msg-chat", chatMsg);
    document.getElementById("message-chat").value = "";
  }
}

const btnSendChat = document
  .getElementById("btn-sendchat")
  .addEventListener("click", sendMsgChat);
