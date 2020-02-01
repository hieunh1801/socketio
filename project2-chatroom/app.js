var express = require("express");
var http = require("http");
var socketio = require("socket.io");

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = http.createServer(app);
var io = socketio(server);

const PORT = 3000;
server.listen(PORT);

app.get("/", (req, res) => {
    res.render("index");
})
console.log(`starting on port: http://localhost:${PORT}/`)
// Socketio
var listUser = ["AAA"]

io.on("connection", (socket) => {
    console.log("socket connected", socket.id);
    /**
     * Cứ mỗi khi có 1 người connect tói server
     * => tạo ra 1 room
     * => tạo ra 1 socket nằm trong room đó. Tên room == id của socket
     * Ứng với mỗi socket có 1 room
     */
    console.log("room", socket.adapter.rooms) // show all room on server

    /**
     * Join vào 1 room mới
     * socket.join(room_name): join vào 1 room
     * socket.leave(room_name): leave khỏi 1 room
     */
    socket.on("create-new-room", (room_name) => {
        console.log("create new room", room_name);
        socket.join(room_name); // join to room with room_name
        console.log("room", socket.adapter.rooms)
    })

})
