import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    // ✅ Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // ✅ Extract user data
    const { name, email, picture } = payload;

    // ✅ Check if user exists
    let user = await User.findOne({ email });

    // ✅ If not, create new user
    if (!user) {
      user = await User.create({
        name,
        email,
        picture,
      });
    }

    // ✅ Create JWT
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token: jwtToken,
      user,
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Authentication failed" });
  }
};