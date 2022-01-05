import {Router} from 'express'
import jwt, {JwtPayload} from 'jsonwebtoken'
import {deleteContact,getContacts,saveContact} from '../db/index';

const router = Router()

router.delete('/delete' , async (req,res) => {
  const {id} = req.query
  const {_token} =  req.cookies
      try {
          const decode = jwt.verify(_token,process.env.SECRET) as JwtPayload
          try {
            deleteContact(id as string);
            res.status(201).send()
          } catch (err) {
            console.error(`Something went wrong:`);
            res.status(400).send({message:"something went wrong"})
          }
      } catch (error) {
          res.status(401).send({message:"Unauthenticated"})
      }
})

router.get('/getAll', async (req, res) => {
    const {_token} =  req.cookies
    try {
        const decode = jwt.verify(_token,process.env.SECRET) as JwtPayload
        try {
          const contacts = await getContacts(decode.id);
          res.send(contacts)
        } catch (err) {
          console.error(`Something went wrong:`);
          res.status(400).send({message:"something went wrong"})
        }
    } catch (error) {
        res.status(401).send({message:"Unauthenticated"})
    }

  });

  router.post('/add', async (req, res) => {
    const {name,phone} = req.body
    const {_token} =  req.cookies

    try {
        const decode = jwt.verify(_token,process.env.SECRET) as JwtPayload
        try {
          saveContact(decode.id,name,phone);
          res.status(201).send()
        } catch (err) {
          console.error(`Something went wrong:`);
          res.status(501).send("error")
        }
    } catch (error) {
        res.status(401).send({message:"Unauthenticated"})
    }

  })

export default router