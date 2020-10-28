import { NextFunction, Response } from "express";
import IRequest from "../types";

import jwt from 'jsonwebtoken';

interface IDecrypt{
    id:string,
    iat:number,
    exp:number
}

// middleware to validate token (rutas protegidas)
export const verifyToken = (req:IRequest, res:Response, next:NextFunction) => {
    try {
        const token = req.header('auth-token')
        if (!token) return res.status(400).json({ error: 'no se ha enviado un token' }) //verificamos si se ha mandado un token
        const decrypt = jwt.verify(token, process.env.TOKEN_SECRET || '' ) as IDecrypt;
        req.userId = decrypt.id //creamos una varible req usable en cualquier ruta con la id del usuario, para usarlo en una ruta la ruta debe tener el middleware
        next() // continuamos
    } catch (error) {
        res.status(401).json({error: 'desautorizado'}) //en este caso seria que el token se hubiera pasado el tiempo establecido
    }
}