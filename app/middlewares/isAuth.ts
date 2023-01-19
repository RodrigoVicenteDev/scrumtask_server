import * as dotenv from "dotenv"
dotenv.config()

const { expressjwt: expressJWT } = require("express-jwt");
const env: any = process.env;
 export default expressJWT({
  secret: env.TOKEN_SIGN_SECRET,
  algorithms: ["HS256"],
})