import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 2021;

app.use(express.static(path.resolve("public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.send("hello real-time world!");
});

app.listen(port, () => {
  console.log(`Open page @ http://localhost:${port}`);
});
