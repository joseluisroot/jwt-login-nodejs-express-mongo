const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const { json } = require("body-parser");

const AuthCtrl = {};

AuthCtrl.signIn = async (req, res) => {
  
  //plugin https://hapi.dev/ => joi

  const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  // validaciones
  const { error } = schemaLogin.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  
  const validPassword = await User.comparePassword(
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
    process.env.TOKEN_SECRET, //secret to encode token, will be needed to deencode token
    { expiresIn: 172800 } //we set time ti expires the token (48h) when token expires user need to sign in again
  );

  res.json({
      error: null,
      message: 'exito bienvenido',
      data: token
  });//we send him token if all was right

};

AuthCtrl.register = async (req, res) => {
  const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  // validate user
  const { error } = schemaRegister.validate(req.body);

  if(error){
    res.status(400).json({error});
  }

  const {
    name,
    email,
    password
  } = req.body;
 
  const user = new User({
    name,
    email,
    password: await User.encryptPassword(password)
  });

  const userSave = await user.save();

  const token = jwt.sign({
    id:userSave._id
  },
  process.env.TOKEN_SECRET,
  { expiresIn: 172800 }
  );
  
  res.json(token);
 
};

AuthCtrl.getDataUserbyToken = async (req,res) =>{

  //console.log(req.userId);
const user = await User.findById(req.userId, {password:0});

if(!user)return res.status(404).json({message:"User not Found"});

res.json(user);

};

module.exports = AuthCtrl;
