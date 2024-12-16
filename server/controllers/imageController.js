import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

// Function to generate an image (already present, used as an example)
export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    // Fetch the user
    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Check if the user has enough credits for the operation
    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    // Create the multi-form data
    const formData = new FormData();
    formData.append("prompt", prompt);

    // Send the request to the external API
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64, ${base64Image}`;

    // Deduct credits after image generation
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Example of a payment handler where credits are increased after payment
export const handlePaymentSuccess = async (req, res) => {
  try {
    const { userId, paymentAmount } = req.body;

    // Fetch the user from the database
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Increase the credit balance based on the payment amount
    const newCreditBalance = user.creditBalance + paymentAmount;

    // Update the user's credit balance in the database
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: newCreditBalance,
    });

    res.json({
      success: true,
      message: "Payment Successful",
      creditBalance: newCreditBalance,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
