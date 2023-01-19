import { Request } from 'express';


type User = {
    _id: ObjectId
    name: string;
    email: string;
    profilePic: string,



  };

  declare module 'express' {
    export interface Request {
      auth: any;
      currentUser:any
    }
  }
  
