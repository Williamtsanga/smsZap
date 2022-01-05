import express from 'express'
import contactsRoute from './contacts'
import userRouter from './user'
import {findUser} from '../db/index';

import messagesRouter from './messages'

const router = express.Router()
router.use('/contacts',contactsRoute)
router.use('/user',userRouter)
router.use('/messages',messagesRouter)
router.post("/passwordReset", async (req,res) => { // /api/user/passwordReset
  // const tok = randomString(60, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
  const {email,phone} = req.body
//  main().catch(console.error) // site.com?token=qdfsdfq

  try {
      const user = findUser({email,phone})
      if(!user)
          res.status(400).send({message:"user does not exist"})
      else{
          // setPasswordResetToken(tok,email);
      res.send({status:true})
  }
  } catch (err) {
      console.log(err)
      res.status(400).send({message:"something went wrong"})
  }

})
// router.get('/verifyToken' , async (req,res) => { // /api/verifyToken?token=qsdfqsdfqsdfsqdf
//   const {token} = req.query
//   try {
//     const result = await findPasswordResetToken(token as string)
//     if(result)
//       {
//         console.log(result)
//         if ((new Date(result.expireAt).getTime() - new Date().getTime()) < 0)
//           res.status(400).send({message:"token expired"})
//         else
//           res.send({state:true})
//       }
//     else
//       res.send({state:false})
//   } catch (error) {
//       res.status(501).send({message:"something went wrong"})
//   }
// })
export default router