import { databaseConnection } from "../connection.js";
import User from "./users.model.js";
import Post from "./posts.model.js";
import Comment from "./comments.model.js";

// Define associations
User.hasMany(Post, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: { allowNull: false },
});
User.hasMany(Comment, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: { allowNull: false },
});
Post.belongsTo(User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: { allowNull: false },
});
Post.hasMany(Comment, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: { allowNull: false },
});
Comment.belongsTo(Post, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: { allowNull: false },
});
Comment.belongsTo(User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: { allowNull: false },
});

export { databaseConnection, User, Post, Comment };
