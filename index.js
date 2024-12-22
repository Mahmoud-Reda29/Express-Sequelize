import './config.js';
import express from 'express';
import bootstrap from './src/app.controller.js';
import { checkConnection } from './src/DB/connection.js';


const app = express();
const port = process.env.PORT || 3000;

bootstrap(app, express);

checkConnection();


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});