$(document).ready(() => {
    const url = "http://localhost:3000/"
    var socket = io(url);
    $("#loginForm").show();
    $("#chatForm").hide();
    // User gửi thông tin đăng nhập lên
    $("#btnRegister").click(() => {
        let username = $("#txtUsername").val();
        socket.emit("client-send-username", username);
    });
    // User lắng nghe sự kiện đăng nhập thất bại
    socket.on("server-send-login-error", () => {
        alert("Require another username");
        $("#txtUsername").val("");
    })
    // User lắng nghe sự kiện đăng nhập thành công
    socket.on("server-send-login-success", (username) => {
        $("#loginForm").hide(1000);
        $("#chatForm").show(2000);
        $("#spanUsername").html(username);
    })
    socket.on("server-send-list-user", (listUserConneted) => {
        $("#listUserOnline").html("");
        listUserConneted.forEach(element => {
            $("#listUserOnline").append(`<div>${element}</div>`);

        });
    })
    // user logout
    $("#btnLogout").click(() => {
        socket.emit("client-send-logout");
        $("#loginForm").show();
        $("#chatForm").hide();
    })
    // user chat
    $("#btnSendMessage").click(() => {
        const message = $("#txtMessage").val();
        console.log("message: ", message)
        socket.emit("client-send-message", message)
    })

    socket.on("server-send-message", ({ message, username }) => {
        $("#listMessage").append(`<div>${username}: ${message}</div>`);
    })
})