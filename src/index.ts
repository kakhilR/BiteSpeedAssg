import express, { Request, Response } from 'express';
import sequelize from './dbConfig/config';
const app = express();


const port = 8000;

app.get('/hi',(req: Request, res: Response)=>{
    res.send("hello")
})

sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });