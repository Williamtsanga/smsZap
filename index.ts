import express from 'express'
import cookieParser  from 'cookie-parser'
import {connectToServer} from './db/index';
import bodyParser  from 'body-parser';
import dotenv from 'dotenv'
import routes from './back/index'
import path from 'path';

dotenv.config()
const STATIC = path.resolve(__dirname,'frontend/dist')
const INDEX = path.resolve(STATIC , 'index.html')
const app = express();
app.use(bodyParser.json());

const PORT = 5000;

app.use(cookieParser());
app.use('/api', routes)
// app.post ("api/login" , async (req,res) => {

// } )

connectToServer( (err)  => {
    if (err) {
      console.error(err);
      process.exit();
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
}, process.env.DATABASE_URI);

app.get('*', (req,res) => {
  res.sendFile(INDEX);
})