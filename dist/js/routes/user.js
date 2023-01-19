"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const jwtconfig_1 = __importDefault(require("../config/jwtconfig"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const attachCurrentUser_1 = __importDefault(require("../middlewares/attachCurrentUser"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
// SignUp ###################################################################
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        if (!password ||
            !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#_!])[0-9a-zA-Z$*&@#_!]{8,}$/)) {
            return res
                .status(400)
                .json({ message: "Senha não atende os requisitos de segurança" });
        }
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        const newUser = (yield usermodel_1.default.create(Object.assign(Object.assign({}, req.body), { passwordHash: passwordHash })));
        delete newUser._doc.passwordHash;
        return res.status(201).json(newUser);
    }
    catch (error) {
        return res.status(400).json(error);
    }
}));
// LogIN ###################################################################
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Por favor, informe seu email e senha." });
        }
        const user = (yield usermodel_1.default.findOne({ email: email }));
        if (!user) {
            return res.status(400).json({ message: "Usuário ou senha incorretos" });
        }
        if (yield bcrypt_1.default.compare(password, user.passwordHash)) {
            delete user._doc.passwordHash;
            const token = (0, jwtconfig_1.default)(user);
            return res.status(200).json({
                token: token,
                user: user,
            });
        }
        else {
            return res.status(400).json({ message: "Senha ou email incorretos" });
        }
    }
    catch (error) {
        return res.status(400).json(error);
    }
}));
// Rota para editar usuario ###############################################################
router.put("/editar", isAuth_1.default, attachCurrentUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedInUser = req.currentUser;
        const editarusuario = yield usermodel_1.default.findByIdAndUpdate(loggedInUser._id, Object.assign({}, req.body), { new: true, runValidators: true });
        delete editarusuario._doc.passwordHash;
        return res.status(200).json(editarusuario);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield usermodel_1.default.find();
        return res.status(200).json(todos);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}));
exports.default = router;
