
const url = "http://localhost:3000/";
var socket = io(url);
console.log(url)
$(document).ready(() => {
    console.log(socket)
    $("#loginForm").show();
    $("#chatForm").hide();
    // LOGIN
    $("#btnRegister").click(() => {
        let username = $("#txtUsername").val();
        console.log(`login with username = ${username} ...`)
        socket.emit("client-send-username", username);
    })
    socket.on("server-send-login-fail", () => {
        alert("Login fail. Choose another username");
    })
    socket.on("sever-send-login-success", (username) => {
        $("#currentUserName").html(username);
        $("#loginForm").hide(1000);
        $("#chatForm").show(1000);
    })
    socket.on("server-send-listUser", (listUser) => {
        $("#boxContent").html("");
        listUser.forEach(element => {
            $("#boxContent").append(`<div class="user"> ${element} </div>`)
        });
    })

    // LOGOUT
    $("#btnLogout").click(() => {
        socket.emit("client-send-logout");
        $("#loginForm").show(2000);
        $("#chatForm").hide();

    })

    // CHAT
    $("#btnSendMessage").click(() => {
        let message = $("#txtMessage").val();
        $("#txtMessage").val("");
        socket.emit("client-user-send-message", message);
    })
    socket.on("server-send-message", (data) => {
        let { username, message } = data;
        $("#listMessage").append(`<div class="ms">${username}: ${message}</div> `)
    })

    // Sự kiện đang gõ văn bản
    $("#txtMessage").focusin(() => {
        socket.emit("client-send-on-typing");
    })
    $("#txtMessage").focusout(() => {
        socket.emit("client-send-end-typing");
    })
    socket.on("server-send-on-typing", (data) => {
        let { username, message } = data;
        $("#userTyping").html("");
        $("#userTyping").append(`${username}, ${message} ...`)
    })
    socket.on("server-send-end-typing", () => {
        $("#userTyping").html("");
    })
})