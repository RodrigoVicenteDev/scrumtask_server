import UserModel from "../models/usermodel";
import { NextFunction, Request, Response  }  from "express";







 async function attachCurrentUser(req :any, res:Response, next:NextFunction){
    try {
        const loggedInUser = req.auth
        console.log(req.auth)
        const user = await UserModel.findById(loggedInUser._id,{
            passwordHash: 0,
        }) 

        req.currentUser = user;

    next();
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

export default attachCurrentUser