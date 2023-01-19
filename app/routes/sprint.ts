import express from "express";
import generateToken from "../config/jwtconfig";
import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import UserModel from "../models/usermodel";
import ClientModel from "../models/clientmodel";
import ProjectModel from "../models/projectmodel";
import SprintModel from "../models/sprintmodels";
import TaskModel from "../models/taskmodel";
const router = express.Router();





export default router;