require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const subscribersRouters = require("./routes/subscribersRouters");
app.use("/subscribers", subscribersRouters);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
