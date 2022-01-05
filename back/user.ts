import bcryptjs from 'bcryptjs'
import jwt  from 'jsonwebtoken'
import {register,findUser,userType,resetPassword} from '../db/index';
import express from 'express'
// import mail from 'nodemailer'

const router = express.Router()

// const main = async () => {
//     const transporter = mail.createTransport({
//         service:'gmail',
//         auth: {
//             user: "williametmellissa1@gmail.com",
//             pass: "jtalifldynftkwic"
//         }
//     })
//     const info = await transporter.sendMail({
//         from : "mouff",
//         to : "tsangacolab@gmail.com",
//         subject: "hello from node",
//         text: "mouf ein",
//         html : "<a href='/' >Go</a>"
//     })
//     console.log(info)
// }

// const  randomString = (length:number, chars:string)  => {
//     let result = '';
//     for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
//     return result;
//   }
  router.post ("/register" , async (req,res) => {
    const {username,password,email,phone} : userType = req.body;
    if (!(username && password && email && phone)) {
        res.status(400).send({status : false , message : "All input is required"});
      }
      else
        try {
              const testIfUserExist = await findUser({username})
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

  router.post ("/login" , async (req,res) => {
    const {username,password,email} : userType = req.body;
    if (!(username && password && email)) {
        res.status(400).send({status : false , message : "All input is required"});
      }
      else
        try {
              const user = await findUser({username})
              if (!user)
                res.status(400).send({status : false , message : "Sorry User does not exist !!"});
              else {

                const _token = jwt.sign(
                  {id: user._id.toString(), username:user.username,email:user.email,phone:user.phone},
                  process.env.SECRET , {
                    expiresIn : "15d"
                  })
              console.log(`created documents`);
              res.cookie("_token",_token, {maxAge: 90000 , httpOnly: true})
              res.status(201).send({_token})
                }



            } catch (err) {
              console.error(`Something went wrong:`);
              res.send("error")
            }
  } )


  router.post("/reset" , async (req,res) => { // /api/user/reset
    const {email,password} = req.body
    try {
      const newPwd = await bcryptjs.hash(password,10)
      resetPassword(email,newPwd)
      res.status(200).send()
    } catch (error) {
      console.log(error)
      res.status(400).send({message:"something went wrong"})
    }
  })

export default router