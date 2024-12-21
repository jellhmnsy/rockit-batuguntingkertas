
const express = require("express");
const app = express();
const validators = require("./validators");
const port = 3000;

app.use(express.json());

const userRouter = require("./router.js/user");
const authRouter = require("./router.js/auth");

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log("App Running!");
});
