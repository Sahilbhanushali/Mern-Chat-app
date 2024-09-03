const express = require("express");
const chats = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json()); // to accept json Data
connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
