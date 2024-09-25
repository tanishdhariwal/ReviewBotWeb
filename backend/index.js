const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectionToDB = require("./DB/dbconnection");
const router = require("./routes/userRoutes");


const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204
};
const app = express();
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

app.use(cors(corsOptions));
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
