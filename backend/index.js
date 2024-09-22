const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectionToDB = require("./DB/dbconnection");
const router = require("./routes/userRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use(router);


try {
  connectionToDB();

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
} catch (error) {
  console.log("Error connecting to the database");
}
