import express from "express";
import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import UserModel from "../models/usermodel";
import ClientModel from "../models/clientmodel";
import ProjectModel from "../models/projectmodel";
import SprintModel from "../models/sprintmodels";
import TaskModel from "../models/taskmodel";
const router = express.Router();


router.post("/create",  async (req, res) => {
    try {
        const newsprint = await SprintModel.create(req.body);
        return res.status(201).json(newsprint);
    } catch (error) {
        console.log(error)
    }
})



export default router;