import { DataTypes, Model } from "sequelize";
import { databaseConnection } from "../connection.js";

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: databaseConnection,
    modelName: "Comment",
  }
);

export default Comment;
