import * as mongoose from "mongoose";

interface User {
  name: string;
  email: string;
  passwordHash: string;
  sector: string;
  project: string;
  sprint: string;
  task: string;
  profilePic: string;
  scrumpaper: string;
}

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
    default:
      "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
  },
  scrumpaper: {type: String, enum: ["productOwner", "scrumMaster", "devTeam"], require: true},
});

const UserModel = mongoose.model<User & mongoose.Document>(
  "User",
  userschema
);

export default UserModel;
