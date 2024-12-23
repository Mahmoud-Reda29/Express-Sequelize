import { User } from "../../DB/models/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    const newUser = User.build({ name, email, role, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
};

export const createOrUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, password } = req.body;
  try {
    const [user, created] = await User.findOrCreate({
      where: { id },
      defaults: { name, email, role, password },
      validate: false,
    });
    if (!created) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;
      user.password = password || user.password;
      await user.save({ validate: false });
      return res
        .status(200)
        .json({ message: "User updated successfully", user: user });
    }
    res.status(200).json({ message: "User created successfully", user: user });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: error.errors.map((e) => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["role"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User found successfully", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User found successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
