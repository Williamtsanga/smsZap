import express from 'express'
import jwt from 'jsonwebtoken'
import {sendSMS,getAllMessages} from '../db/index';

const router = express.Router()

router.get('/all' ,async (req,res) => {
    const {_token} = req.cookies
    try {
        const decode = jwt.verify(_token,process.env.SECRET) as jwt.JwtPayload
        try {
          const messages = await getAllMessages(decode.id);
          res.send(messages)
        } catch (err) {
          console.error(`Something went wrong:`);
          res.status(400).send({message:"something went wrong"})
        }
    } catch (error) {
        res.status(401).send({message:"Unauthenticated"})
    }
})
router.post('/send', async (req,res) => {
    const {_token} = req.cookies
    const {message,contact} = req.body
    try {
        const decode = jwt.verify(_token,process.env.SECRET) as jwt.JwtPayload
        try {
          sendSMS(decode.id,contact,message);
          res.status(201).send({message:"done"})
        } catch (err) {
          console.error(`Something went wrong:`);
          res.status(400).send({message:"something went wrong"})
        }
    } catch (error) {
        res.status(401).send({message:"Unauthenticated"})
    }
})

export default router