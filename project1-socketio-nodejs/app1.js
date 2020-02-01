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
    res.render("app1");
})

// Socketio
io.on("connection", (socket) => {
    console.log("socket connected", socket.id)

    socket.on("client-send-data", (data) => {
        console.log(`socket.id: ${socket.id} send data ${data}`)

        // TH1: gửi cho tất cả mọi người
        io.sockets.emit("server-send-data", `${data} + ${socket.id}`)

        // TH2: gửi trả lại cho mình thôi
        // socket.emit("server-send-data", `${data} + ${socket.id}`)

        // TH3: gửi lại cho B, C, D trừ A
        // socket.broadcast.emit("server-send-data", `${data} + ${socket.id}`)

    })
    socket.on("disconnect", () => {
        console.log("socket disconnect", socket.id)
    })
})
