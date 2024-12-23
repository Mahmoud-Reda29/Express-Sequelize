import "./config.js";
import express from "express";
import bootstrap from "./src/app.controller.js";
import { checkConnection, syncDatabase } from "./src/DB/connection.js";
import { databaseConnection } from "./src/DB/models/index.js";

const app = express();
const port = process.env.PORT || 3000;

bootstrap(app, express);

checkConnection();
syncDatabase();

databaseConnection.authenticate();

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
