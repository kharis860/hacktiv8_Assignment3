require("dotenv").config();
const express = require("express");
const app = express();

const allRouter = require("./routes/index");
const port = process.env.PORT;

const env = process.env.NODE_ENV;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "welcome to test API" });
});
app.use(allRouter);
if (env !== "test") {
  app.listen(port, () => {
    console.log(`server running on http://localhost:${port}/`);
  });
}

module.exports = app;
