import { DataTypes } from "sequelize";
import { databaseConnection } from "../connection.js";

function checkNameLength(name) {
  if (name.length < 2) {
    throw new Error("Name must be at least 2 characters.");
  }
}

const User = databaseConnection.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      defaultValue: "user",
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        checkPasswordLength(value) {
          if (value.length < 8) {
            throw new Error("Password must be at least 8 characters.");
          }
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        checkNameLength(user.name);
      },
    },
  }
);

export default User;
