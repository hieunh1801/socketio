var express = require("express")
var app = express()
var http = require("http")


app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = http.createServer(app);
var socketio = require("socket.io")
var io = socketio(server)

const PORT = 3000
server.listen(PORT)

app.get("/", (req, res) => {
    res.render("app2");
})
console.log(`starting on port: http://localhost:${PORT}/`)
// Socketio
var listUser = ["AAA"]

io.on("connection", (socket) => {
    console.log("socket connected", socket.id)

    socket.on("client-send-username", (username) => {
        console.log(`socket.id: ${socket.id}. username: ${username}`)
        if (listUser.indexOf(username) >= 0) {
            // login fail
            socket.emit("server-send-login-fail");
        } else {
            // login success
            listUser.push(username);

            socket.username = username; // gán username vào đối tượng socket
            socket.emit("sever-send-login-success", username);
            io.sockets.emit("server-send-listUser", listUser);
        }
    })
    // login
    socket.on("client-send-logout", () => {
        listUser.splice(listUser.indexOf(socket.username), 1);

        socket.broadcast.emit("server-send-listUser", listUser)
    })
    // logout
    socket.on("client-user-send-message", (message) => {
        let data = { username: socket.username, message: message };
        io.sockets.emit("server-send-message", data);
    })
    // on-typing
    socket.on("client-send-on-typing", () => {
        let data = { username: socket.username, message: "on typing" };
        socket.broadcast.emit("server-send-on-typing", data);
    })
    socket.on("client-send-end-typing", () => {
        socket.broadcast.emit("server-send-end-typing");
    })

    socket.on("disconnect", () => {
        console.log("socket disconnect", socket.id)
    })
})
