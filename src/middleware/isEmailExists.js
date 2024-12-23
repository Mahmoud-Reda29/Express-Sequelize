const isEmailExists = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await userModel.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    next();
  } catch (error) {
    throw new Error(error);
  }
};

export default isEmailExists;
