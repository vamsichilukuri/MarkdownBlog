// including express module
const express = require("express");
const mongoose = require("mongoose");
const ArticlesModel = require("./models/article");
const articleRouter = require("./routes/article");
const methodOverride = require("method-override");

const app = express();

//connect to db
mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
//view engine
app.set("view engine", "ejs");

//use db model to article.js
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//create a router
app.get("/", async (req, res) => {
  const articles = await ArticlesModel.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

//use routers
app.use("/articles", articleRouter);

// listing server
app.listen(5000, () => {
  console.log("server is listening at 5000");
});
