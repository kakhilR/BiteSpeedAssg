import bodyParser from 'body-parser';
import express from 'express';
import sequelize from './dbConfig/config';
import Routes from "./routes";


const app = express();
const port = 8000;

app.use(bodyParser.json());


new Routes(app)

sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });