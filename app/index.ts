import express from "express";
import UserRoutes from "./routes/user"
import ProjectRoutes from "./routes/project"
import ClientRoutes from "./routes/client"
import SprintRoutes from "./routes/sprint"
import TaskRoutes from "./routes/task"

import * as dotenv from "dotenv"
dotenv.config()
const dotenvExpand = require('dotenv-expand')



const app = express();
app.use(express.json());

const dbConection = require("./config/dbconfig");
dbConection();




app.use("/user", UserRoutes);
app.use("/project", ProjectRoutes);
app.use("/client", ClientRoutes);
app.use("/sprint", SprintRoutes);
app.use("/task", TaskRoutes);




app.listen(process.env.PORT, () => {
  console.log(`SERVER OPEN As RUNNIG ON PORT ${process.env.PORT}`);
});
