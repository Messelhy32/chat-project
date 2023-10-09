var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const socketio = require('socket.io');

dotenv.config();
var app = express();
const server = app.listen(80, () => {
  console.log('Server running!')
});
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"]
  }
});
io.on('connection', (socket) => {
  console.log('New connection')
})
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:8080"
//   }
// });

// server.listen(5173);
app.use(cors());
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Success");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// server.listen(8080, () => {
//   console.log("Server is running on http://localhost:8080");
// });
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Listen for custom events from the client
//   socket.on("chat message", (message) => {
//     console.log("Received message:", message);

//     // Broadcast the message to all connected clients
//     io.emit("message", message);
//   });

//   // Handle disconnections
//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
