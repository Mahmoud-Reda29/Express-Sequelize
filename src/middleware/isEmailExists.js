import { User } from "../DB/models/index.js";

const isEmailExists = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default isEmailExists;
