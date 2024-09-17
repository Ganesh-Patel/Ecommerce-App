import jwt from "jsonwebtoken";
import "dotenv/config";
import { generateCrypto } from "../Utils/generateRandomCrypto.js";

export function generateToken() {
  return jwt.sign(
    {
      admin_token: generateCrypto,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
}