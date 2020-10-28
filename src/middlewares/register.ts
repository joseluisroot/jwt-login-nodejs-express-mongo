import { NextFunction, Request, Response } from "express";

import  User from "../models/User";

export const isEmailExist = async (req:Request, res:Response, next:NextFunction) => {
        
    const emailVerification = await User.findOne({ email: req.body.email });          

        if (emailVerification) {
            return res.status(400).json({ error: "Email ya registrado" });
        }
        next();
    }

 