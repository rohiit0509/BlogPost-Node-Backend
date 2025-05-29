import express  from "express"
import { LoginRequest, SignupRequest, ForgetPassword } from "../controllers/user";

const userRouter = express.Router();

userRouter.post("/signup", SignupRequest)
userRouter.post("/login", LoginRequest)
userRouter.post("/emailsend", ForgetPassword)
export default userRouter;