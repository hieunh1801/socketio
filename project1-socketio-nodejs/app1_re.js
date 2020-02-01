var express = require("express")
var app = express()
var http = require("http")


app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = http.createServer(app);
var socketio = require("socket.io")
var io = socketio(server)

const PORT = 3001
server.listen(PORT)
console.log(`http://localhost:${PORT}/`)
app.get("/", (req, res) => {
    res.render("app1_re")
})

// Socketio
io.on("connection", (socket) => {
    console.log("socket connected:", socket.id);
    socket.on("client-send-data", (data) => {
        console.log(`listening client-send-data: ${data}`);
        console.log(`socket-id: ${socket.id}`);
        console.log(`data: ${data}`);
        // TH1: send data lại cho A, trừ B, C, D
        // socket.emit("sever-send-data", `socketid: ${socket.id} ${data} `);

        // TH2: gửi lại cho tất cả mọi người
        // io.sockets.emit("sever-send-data", `socketid: ${socket.id} ${data} `);

        // TH3: gửi lại cho B,C,D trừ A
        socket.broadcast.emit("sever-send-data", `socketid: ${socket.id} ${data} `);
    })

    socket.on("disconnect", () => {
        console.log(`socket disconneted: ${socket.id}`);
    })
})