const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `./.env` });

const app = require("./app");

const connectionString = "mongodb://127.0.0.1:27017/natours-test";

// mongoose
//     .connect(connectionString, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//     })
//     .then((connection) => {
//         console.log("Connected to DB");
//     });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
