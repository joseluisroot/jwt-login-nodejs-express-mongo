import { Request, Response } from "express";
import { comparePassword, encryptPassword } from "../helpers/passwords";
import IRequest from "../types";

import User from '../models/User';
import jwt from 'jsonwebtoken';
import Joi from "@hapi/joi";

export const signIn = async (req:Request, res:Response) => {
  
  const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
 
  // validaciones
  const { error } = schemaLogin.validate(req.body);
  
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  const validPassword = await comparePassword(
    user.password,
    req.body.password
  ); //llamamos a la funcion creada en el modelo de User para comparar las contraseñas
  if (!validPassword)
    return res.status(400).json({ error: "contraseña no válida" });

  // create token
  // payload
  const token = jwt.sign(
    {
      id: user._id, //we save user id to save in req varible in middleware when we deencode token
    },
    process.env.TOKEN_SECRET || '', //secret to encode token, will be needed to deencode token
    { expiresIn: 172800 } //we set time ti expires the token (48h) when token expires user need to sign in again
  );

  res.json(token); //we send him token if all was right

  // res.json({
  //     error: null,
  //     data: 'exito bienvenido',
  //     token: token
  // })
};

export const register = async (req:Request, res:Response) => {
  
  const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  
  const {name, email, password} = req.body

  const user = new User({
    name,
    email,
    password: await encryptPassword(password)
  })

  const savedUser = await user.save()

  const token = jwt.sign({id: savedUser._id}, process.env.TOKEN_SECRET || '', {
    expiresIn: 172800
  })

  return res.json(token)

};

export const getDataUserbyToken = async(req:IRequest, res:Response)=>{

  console.log(req.userId);
  const user = await User.findById(req.userId, {password: 0});

  if(!user){
    return res.status(404).json({
      message:"User not found"
    });
  }

  return res.json(user);
  
}

