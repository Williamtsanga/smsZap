import express from 'express'
import cookieParser  from 'cookie-parser'
import {connectToServer,register,findUser,userType} from './db/index';
import bodyParser  from 'body-parser';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(bodyParser.json());

const PORT = 5000;

app.use(cookieParser());

// app.post ("api/login" , async (req,res) => {

// } )

app.post ("/api/register" , async (req,res) => {
  const {username,password,email,phone} : userType = req.body;
  if (!(username && password && email && phone)) {
      res.status(400).send({status : false , message : "All input is required"});
    }
    else
      try {
            const testIfUserExist = await findUser(username)
            if (testIfUserExist)
              res.status(400).send({status : false , message : "User already exist !!"});
            else {
              const encryptPassord = await bcryptjs.hash(password,10);
              register({username,password:encryptPassord,email,phone},
                (newId) => {
                console.log(newId.toString(), "user id bro")
              const _token = jwt.sign({
                id: newId.toString(),username,email,phone
              } , process.env.SECRET)
            console.log(`Updated documents`);
            res.cookie("_token",_token, {maxAge: 90000 , httpOnly: true})
            res.status(201).send({_token})
              });

            }

          } catch (err) {
            console.error(`Something went wrong:`);
            res.send("error")
          }
} )

app.post ("/api/login" , async (req,res) => {
  const {username,password,email} : userType = req.body;
  if (!(username && password && email)) {
      res.status(400).send({status : false , message : "All input is required"});
    }
    else
      try {
            const user = await findUser(username)
            if (!user)
              res.status(400).send({status : false , message : "Sorry User does not exist !!"});
            else {

              const _token = jwt.sign(
                {id: user._id.toString(), username:user.username,email:user.email,phone:user.phone},
                process.env.SECRET)
            console.log(`created documents`);
            res.cookie("_token",_token, {maxAge: 90000 , httpOnly: true})
            res.status(201).send({_token})
              }



          } catch (err) {
            console.error(`Something went wrong:`);
            res.send("error")
          }
} )

app.get('/api', async (req, res) => {
  res.send('bla bla bla ')
    // try {
    //     const user = await getUsers();
    //     res.send(user)
    //     console.log(`Updated documents`);
    //   } catch (err) {
    //     console.error(`Something went wrong:`);
    //     res.send("error")
    //   }
})

connectToServer( (err)  => {
    if (err) {
      console.error(err);
      process.exit();
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
}, process.env.DATABASE_URI);