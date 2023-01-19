import mongoose from "mongoose";

const env: any = process.env;
async function connect() {
  try {
    mongoose.set("strictQuery", true);
    const dbConnection:any = await mongoose.connect(env.MONGODB_URI);
    console.log("CONECTADO AO DB", dbConnection.connection.name);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connect;
