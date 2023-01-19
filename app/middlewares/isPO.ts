import UserModel from "../models/usermodel";
import { NextFunction, Request, Response  }  from "express";


export default async function isPO(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UserModel.findById(req.currentUser.id);
        if (user?.scrumpaper === "productOwner") {
            return next();
        }
        return res.status(401).send("You are not a productOwner");
    } catch (error) {
        console.log(error);
    }
}   