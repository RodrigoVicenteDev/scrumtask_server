import { Request, Response } from "express";
import express from "express";
const router = express.Router();

import bcrypt from "bcrypt";
const saltRounds: number = 10;

import generateToken from "../config/jwtconfig";
import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import UserModel from "../models/usermodel";
import { User } from "../../custom-express-types";

// SignUp ###################################################################

router.post("/signup", async (req, res) => {
  try {
    const { password, email } = req.body;
    if (
      !password ||
      !password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#_!])[0-9a-zA-Z$*&@#_!]{8,}$/
      )
    ) {
      return res
        .status(400)
        .json({ message: "Senha não atende os requisitos de segurança" });
    }

    const salt = await bcrypt.genSalt(saltRounds);

    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = (await UserModel.create({
      ...req.body,
      passwordHash: passwordHash,
    })) as any;

    delete newUser._doc.passwordHash;
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// LogIN ###################################################################

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Por favor, informe seu email e senha." });
    }

    const user = (await UserModel.findOne({ email: email })) as any;
    if (!user) {
      return res.status(400).json({ message: "Usuário ou senha incorretos" });
    }
    if (await bcrypt.compare(password, user.passwordHash)) {
      delete user._doc.passwordHash;
      const token = generateToken(user);
      return res.status(200).json({
        token: token,
        user: user,
      });
    } else {
      return res.status(400).json({ message: "Senha ou email incorretos" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

// Rota para editar usuario ###############################################################

router.put("/edit", isAuth, attachCurrentUser, async (req: any, res) => {
  try {
    const loggedInUser = req.currentUser;

    const editarusuario = (await UserModel.findByIdAndUpdate(
      loggedInUser._id,
      { ...req.body },
      { new: true, runValidators: true }
    )) as any;
    delete editarusuario._doc.passwordHash;
    return res.status(200).json(editarusuario);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


router.get("/all", async (req, res) => {
  try {
    const todos = (await UserModel.find()) as any;
  const usuarios:User[] = []
  todos.map((todo:any) => {
    delete todo._doc.passwordHash;
    usuarios.push(todo)
  })
    return res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});








export default router;
