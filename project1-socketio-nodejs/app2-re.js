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
    res.render("app2-re");
})
console.log(`starting on port: http://localhost:${PORT}/`)

var listUserConneted = [];
// socket io service
io.on("connection", (socket) => {
    console.log("conected success", socket.id);
    socket.on("client-send-username", (username) => {
        if (listUserConneted.indexOf(username) >= 0) {
            socket.emit("server-send-login-error");
        } else {
            socket.username = username;
            listUserConneted.push(username);
            socket.emit("server-send-login-success", username)
            io.sockets.emit("server-send-list-user", listUserConneted)
        }
    })
    socket.on("client-send-logout", () => {
        let username = socket.username;
        listUserConneted.splice(listUserConneted.indexOf(username), 1);
        io.sockets.emit("server-send-list-user", listUserConneted);

    })
    socket.on("client-send-message", (message) => {
        io.sockets.emit("server-send-message", { message, username: socket.username });
    })


    socket.on("disconnect", () => {
        console.log("disconnected: ", socket.id);
    })
})