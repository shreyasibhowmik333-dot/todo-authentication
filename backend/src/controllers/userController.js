import userSchema from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { verifyMail } from "../emailVerify/verifyMail.js"
import sessionSchema from "../models/sessionSchema.js"


export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body

    const existing = await userSchema.findOne({
      email: email
    })

    if (existing) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userSchema.create({
      userName, email, password: hashedPassword
    })

    const token = jwt.sign({ id: user._id }, process.env.secretKey, {
      expiresIn: "5m"
    })

    verifyMail(token, email)

    user.token = token
    await user.save()

    return res.status(200).json({
      success: true,
      message: "User registered sussessfully",
      data: user
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      } else if (passwordCheck && user.verified === true) {

        const existing = await sessionSchema.findOneAndDelete({
          userId: user._id
        })

        await sessionSchema.create({
          userId: user._id
        })

        const accessToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.secretKey,
          {
            expiresIn: "10days",
          }
        );

        const refreshToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.secretKey,
          {
            expiresIn: "30days",
          }
        );

        user.isLoggedIn = true;
        await user.save();
        return res.status(200).json({
          success: true,
          message: "User Logged in Successfully",
          accessToken: accessToken,
          refreshToken: refreshToken,
          data: user,
        });
      } else {
        res.status(200).json({
          message: "Complete Email verification then Login..",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const logout = async (req, res) => {
  try {
    const existing = await sessionSchema.findOne({ userId: req.userId })

    if (existing) {
      await sessionSchema.findByIdAndDelete({ userId: req.userId })

      await userSchema.findByIdAndUpdate(req.userId, { isLoggedIn: false })

      return res.status(200).json({
        success: true,
        message: "Session ended successfully",
      })
    }

    else {
      return res.status(404).json({
        success: false,
        message: "User had no session",
      })
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


