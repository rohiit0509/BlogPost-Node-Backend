import User from "../models/user";
import { OtpModel } from "../models/user";
import nodemailer from "nodemailer"
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import "../database/index";
import jwt from "jsonwebtoken"

const mailer = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "infocbs869@gmail.com",
      pass: "nqckcnvulorsbezu"
    },
  });
  const mailOptions = {
    from: 'infocbs869@gmail.com',
    to: email,
    subject: 'Reset Password',
    html: `<p>Use this token to reset your password: ${otp}</p>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Error sending reset password email');
    } else {
      console.log(`Reset password email sent ${info.response}`);
    }
  });
}

// SIGNUP REQUEST

export const SignupRequest = async (req: Request, res: Response) => {
  const { email, password, phone, userName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send({ msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      phone,
      userName,
      userProfile: `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${userName}`
    });

    res.status(201).send({ msg: "User created successfully", userId: newUser._id });
  } catch (error: any) {
    res.status(500).send({ msg: error.message });
  }
};


const secretKey = "rohit123"

// LOGIN REQUEST
export const LoginRequest = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(404).send({ msg: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }

    jwt.sign({ id: findUser.id }, secretKey, (err, token) => {
      if (err) {
        return res.status(500).send({ msg: "Error generating token" });
      }

      res.cookie("userAuth", token, { httpOnly: true });
      res.status(200).send({
        msg: "Logged in successfully",
        token,
        user: {
          id: findUser._id,
          email: findUser.email,
          userName: findUser.userName,
          phone: findUser.phone,
          userProfile: findUser.userProfile,
        },
      });
    });
  } catch (err: any) {
    res.status(500).send({ msg: err.message });
  }
};


export const ForgetPassword = (req: Request, res: Response) => {
  try {
    const checkMail = User.findOne({ email: req.body.email })
    if (!checkMail) {
      throw new Error("Email is not exist")
    }
    else {
      let genOtp = Math.floor(Math.random() * 10000 + 1);
      const createOtpData = new OtpModel({
        email: req.body.email,
        otpCode: genOtp,
        expireIn: new Date().getTime()
      })
      createOtpData.save()
      mailer(req.body.email, genOtp)
      res.status(200).send("Please check your email id")
    }
  }
  catch (e) {
    res.status(500).send(e.message)
  }
}


export const ChangePassword = (req: Request, res: Response) => {

}

