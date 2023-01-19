import express from "express";
import UserRoutes from "./routes/user"
import * as dotenv from "dotenv"
dotenv.config()
const dotenvExpand = require('dotenv-expand')



const app = express();
app.use(express.json());

const dbConection = require("./config/dbconfig");
dbConection();




app.use("/user", UserRoutes);

app.listen(process.env.PORT, () => {
  console.log(`SERVER OPEN As RUNNIG ON PORT ${process.env.PORT}`);
});
