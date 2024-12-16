import express from "express";
import {
  registerUser,
  loginUser,
  userCredits,
  updateCredits,
} from "../controllers/useController.js";
import userAuth from "../middlewares/auth.js";
import { handlePaymentSuccess } from "../controllers/imageController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", userAuth, userCredits);
// Route to handle payment success and update credits
userRouter.post("/payment-success", handlePaymentSuccess);
userRouter.post("/update-credits", updateCredits);

export default userRouter;

// http://localhost:5000/api/user/register

// http://localhost:5000/api/user/login

// http://localhost:5000/api/user/credits
