"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { expressjwt: expressJWT } = require("express-jwt");
exports.default = expressJWT({
    secret: "process.env.TOKEN_SIGN_SECRET",
    algorithms: ["HS256"],
});
