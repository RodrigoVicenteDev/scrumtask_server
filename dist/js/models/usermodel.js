"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const userschema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        match: /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        require: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        require: true,
    },
    sector: {
        type: String,
        require: true,
    },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    sprint: { type: mongoose.Schema.Types.ObjectId, ref: "Sprint" },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    profilePic: {
        type: String,
        default: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
    },
    scrumpaper: { type: String, enum: ["productOwner", "scrumMaster", "devTeam"], require: true },
});
const UserModel = mongoose.model("User", userschema);
exports.default = UserModel;
