const express = require("express");
const User = require("./models/userModel");

const notesRouter = require("./routes/notesRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json());

// Healthcheck endpoint
app.use("/api/v1/healthcheck", async (req, res, next) => {
    try {
        await User.find();
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
});

app.use("/api/v1/", authRouter);
app.use("/api/v1/notes", notesRouter);
app.use("", (req, res) => {
    res.sendStatus(404);
});

module.exports = exports = app;
