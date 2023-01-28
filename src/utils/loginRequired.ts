import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const login_required = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (token == null) {
    res.status(401).json({
      error: true,
      message: "Hey user, you need to be logged in first!",
    });
  } else {
    jwt.verify(token, process.env.SECRET!, (err: any, value: any) => {
      if (err) {
        return res
          .status(401)
          .json({ error: true, message: "Access denied. Invalid token." });
      }

      // also need to check if the user exists in the DB
      req.user = value;
      next();
    });
  }
};

export default login_required;
