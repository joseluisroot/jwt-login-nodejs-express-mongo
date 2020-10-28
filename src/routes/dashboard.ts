
import { Response } from "express";
import IRequest from "../types";

import {verifyToken} from '../middlewares/validate-token'
import {Router} from 'express'

const router = Router()

router.get('/',verifyToken, (req:IRequest, res:Response) => {
    return res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.userId
        }
    })
})

export default router;
