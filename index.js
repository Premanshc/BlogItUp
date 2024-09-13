const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");
const checkForAuthenticationCookie = require("./middlewares/authentication");

const app = express();
const PORT = 8000;

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//database connection
mongoose
  .connect("mongodb://localhost:27017/BlogItUp")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB");
    console.error(err);
  });


//routes
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
