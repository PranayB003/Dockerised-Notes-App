const express = require("express");

const notesRouter = require("./routes/notesRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/", authRouter);
app.use("/api/v1/notes", notesRouter);
app.use("", (req, res) => {
    res.sendStatus(404);
});

module.exports = exports = app;
