const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoute");
const messageRoutes = require("./routes/messageRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json()); // to accept JSON data
connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(
  "/api/user",
  (req, res, next) => {
    next();
  },
  userRoutes
);

app.use(
  "/api/chat",
  (req, res, next) => {
    next();
  },
  chatRoutes
);
app.use(
  "/api/message",
  (req, res, next) => {
    next();
  },
  messageRoutes
);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
