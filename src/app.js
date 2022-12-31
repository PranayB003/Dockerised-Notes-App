const express = require("express");

// const tourRouter = require("./routes/tourRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json());

// app.use("/api/v1/tours", tourRouter);
app.use("/api/v1", authRouter);
app.use("", (req, res) => {
    res.send("<h4>Hello World</h4>");
});

module.exports = exports = app;
