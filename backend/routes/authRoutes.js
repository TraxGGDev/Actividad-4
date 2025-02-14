const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");



const router = express.Router();

router.post("/register", async (req, res) =>{
    //ponemos los erequerimientos para poder registrarse
    const {username, email, password} = req.body;
    

    try{
        //verificamos que el correo no exista enb la base de datos
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({error: "El correo ya esta en uso"});
        }
        
        //encriptamos la contraseña para que no se guarde como el usuario lo escribio en el input
        const hashedPassword = await bcrypt.hash(password, 10);

        //creamos el usuario con los datos que ingreso
        const user = new User ({username, email, password: hashedPassword});

        //guardamos en la base de datos el usuario recien creado

        await user.save();

        //mandamos un mensaje de que el usuario se guardo correctamente
        res.status(201).json({message:"Usuario registrado correctamente"});
    }
    catch(error){
        res.status(500).json({error:"Error al registrar usuario"});
    }
});


router.post("/login", async(req, res)=>{
    const {username, password} = req.body;
    try{
        //Buscamos el usuario en la base de datos usando el 'username'
        const user = await User.findOne({username});
        //Si no encontramos al usuario devolvemos un error con código 400 y un mensaje
        if(!username) return res.status(400).json({error:"Usuario no encontrado"});
        //Comparamos la contraseña proporcionada con la contraseña almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        //Si las contraseñas no coinciden devolvemos un error con código 400 y un mensaje
        if(!isMatch) return res.status(400).json({error:"contraseña incorrecta"});
         //Si las credenciales son correctas generamos un token JWT
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
       
        res.json({token});
    }
    catch(error){
        //Si ocurre un error durante el proceso, respondemos con un código de error 500 y un mensaje
        res.status(500).json({error:"Error al iniciar sesion"});
    }
});

module.exports = router;

