import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/Unauthorized.js";
import ForbiddenError from "../errors/Forbidden.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) throw new UnauthorizedError("Unauthorized");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) throw new ForbiddenError("Forbidden");

    req.user = user;
    next();
  });
};
