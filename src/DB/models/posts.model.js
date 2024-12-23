import { DataTypes, Model } from "sequelize";
import { databaseConnection } from "../connection.js";

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: databaseConnection,
    modelName: "Post",
    paranoid: true,
  }
);

export default Post;
