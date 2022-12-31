const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.handleMissingCredentials = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            status: "failed",
            message: "A username and password must be provided",
        });
    }

    next();
};

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // store username and password in database

        res.status(200).send({
            status: "success",
            message: "User created successfully",
        });
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Something went wrong",
        });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Get storedPassword and userID from database
    const storedPassword = "";
    const userID = "";

    try {
        await bcrypt.compare(password, storedPassword);

        // Construct payload
        const payload = {
            username,
            userID,
        };

        const token = jwt.sign(
            payload,
            process.env.AUTHORISATION_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).send({
            status: "success",
            message: "authenticated",
            token,
        });
    } catch (error) {
        res.status(401).send({
            status: "failed",
            message: "Incorrect username or password",
        });
    }
};

exports.authoriseUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        req.authPayload = jwt.verify(
            token,
            process.env.AUTHORISATION_TOKEN_SECRET
        );
        next();
    } catch (error) {
        res.sendStatus(401);
    }
};
