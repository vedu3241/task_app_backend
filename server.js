const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./router");
const PORT = process.env.PORT;

// Database connection
// "mongodb://127.0.0.1:27017/yourDB_name_here" --COMPASS DB URI

// let uri = "mongodb+srv://ved:test123@cluster0.1goshc7.mongodb.net/noteTry22";
let uri = process.env.MONGODB_CONNECT_URI;
mongoose
  .connect(
    uri
    //   {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() => console.log("Databse connected.."))
  .catch((err) => console.log(err));

//template
// app.set("views", path.join(__dirname, "/resources/views"));
// app.set("view engine", "ejs");

//assets
// app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(bodyParser.json());

//Enabling routes
app.use("/", router);

// Activating Port
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
