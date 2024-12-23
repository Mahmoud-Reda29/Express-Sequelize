import { User } from "../../DB/models/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
