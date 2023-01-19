import * as jwt from "jsonwebtoken";

type User = {
    _id: string;
    name: string;
    email: string;
    profilePic: string


  };


function generateToken(user: User):string {
  const { _id, name, email, profilePic } = user;

  const signature:any = process.env.TOKEN_SIGN_SECRET;

  const expiration:string = "5h";

  return jwt.sign({ _id, name, email, profilePic }, signature, {
    expiresIn: expiration,
  });
}

export default  generateToken;