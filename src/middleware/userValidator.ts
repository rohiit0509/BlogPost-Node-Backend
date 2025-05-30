import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = "rohit123";

export const userValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.userAuth;

  if (!token) {
    res.status(401).send("Access Denied");
    return;
  }

  try {
    const verifyToken = jwt.verify(token, secretKey) as { id: string; iat: number };
    if (!verifyToken?.id) {
      throw new Error("Invalid Token");
    }

    (req as any).userId = verifyToken.id;
    next();
  } catch (err: any) {
    res.status(400).send({ msg: err.message });
  }
};