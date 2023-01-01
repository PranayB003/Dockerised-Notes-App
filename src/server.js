const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
console.log(process.env);

const app = require("./app");

const connectionString = "mongodb://mongo:27017/myapp";

mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((connection) => {
        console.log("Connected to DB");

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`App running on port ${port}`);
        });
    });
