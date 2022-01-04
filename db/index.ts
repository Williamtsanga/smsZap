import { MongoClient , Db, AnyError,ObjectId} from "mongodb";


let dbConnection : Db = null;

export type userType = {username:string,password:string,email:string,phone:string}

export const connectToServer = (callback: (err?:AnyError) => void,URI:string) => {
    const client = new MongoClient(URI);

    client.connect((err, db) => {
      if (err || !db) {
        return callback(err);
      }
      dbConnection = db.db("smsZap");
      return callback();
    });
  }

export const register =  (infos : userType , callback : (newId:ObjectId) => void) => {

    return dbConnection.collection("users")
    .insertOne({...infos}, (err,response) => {
      callback(response.insertedId)
    } )
  }

export const getContacts = async (userId:string) => {
    return await dbConnection.collection('contacts').find({userId}).toArray();
  }
export const getAllMessages = async (userId:string) => {
    return await dbConnection.collection('messages').find({userId}).toArray();
  }
export const getContactMessages = async (userId:string,contactId:string) => {
    return await dbConnection.collection('messages').find({userId,contactId}).toArray();
  }
  export const findUser = async (username:string) => {
    return await dbConnection.collection("users").findOne({username});
  }
