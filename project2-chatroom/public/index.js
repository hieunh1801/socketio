
const url = "http://localhost:3000/";
var socket = io(url);
console.log(url)
$(document).ready(() => {
    $("#btnCreateRoom").click(() => {
        let room_name = $("#txtRoom").val();
        socket.emit("create-new-room", room_name);



    })
})