const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

const userRouter = require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

mongoose
  .connect("mongodb://localhost:27017/BlogItUp")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB");
    console.error(err);
  });

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
