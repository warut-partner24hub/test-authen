import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import connectMongoDB from "@/utils/connectMongoDB";
import validator from "validator";
import bcrypt from "bcryptjs";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

type Data = {
  message: string;
};

const window = new JSDOM("").window;
const purify = DOMPurify(window as any);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectMongoDB();

    const { first_name, last_name, email, password } = req.body;

    const sanitizedFirstName = purify.sanitize(first_name);
    const sanitizedLastName = purify.sanitize(last_name);
    const sanitizedEmail = purify.sanitize(email);
    const sanitizedPassword = purify.sanitize(password);

    if (
      !sanitizedFirstName ||
      !sanitizedLastName ||
      !sanitizedEmail ||
      !sanitizedPassword
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (!validator.isEmail(sanitizedEmail)) {
      return res.status(400).json({ message: "Please provide a valid email" });
    }

    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (sanitizedPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sanitizedPassword, salt);

    const newUser = new User({
      first_name: sanitizedFirstName,
      last_name: sanitizedLastName,
      email: sanitizedEmail,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "Register Success!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
