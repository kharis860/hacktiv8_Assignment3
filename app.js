const express = require("express");
const app = express();
const allRouter = require("./routes/index");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "welcome to test API" });
});
app.use(allRouter);

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}/`);
});
