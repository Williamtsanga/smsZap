import { MongoClient , Db, AnyError,ObjectId,Timestamp} from "mongodb";


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

    dbConnection.collection("users")
    .insertOne({...infos}, (err,response) => {
      callback(response.insertedId)
    } )
  }

  export const getContacts = async (userId:string) => {
    return await dbConnection.collection('contacts').find({userId}).toArray();
  }
  export const saveContact =  (userId:string,name:string,phone:string) => {
    dbConnection.collection('contacts').insertOne({userId,name,phone});
  }
  export const deleteContact =  (userId:string) => {
    dbConnection.collection('contacts').deleteOne({userId});
  }


export const getAllMessages = async (userId:string) => {
    return await dbConnection.collection('messages').find({userId}).toArray();
  }
export const sendSMS = async (userId:string,contact:string,message:string) => {
    dbConnection.collection('messages').insertOne({userId,contact,message,createdAt: new Date().getTime()});
  }


  export const findUser = async (params : {username?:string,email?:string,phone?:string}) => {
    return await dbConnection.collection("users").findOne({$and : [{...params}]});
  }
// export const setPasswordResetToken = async (token:string,email:string) => {
//     return await dbConnection.collection("passwordReset").insertOne({token,email,expireAt: new Date().getTime() + 2592000000});
//   }
  // export const findPasswordResetToken = async (token:string) => {
  //   return await dbConnection.collection("passwordReset").findOne({token});
  // }
  export const resetPassword = async (email:string,newPassword:string) => {
    // dbConnection.collection("passwordReset").deleteOne({token})
    return await dbConnection.collection("users").findOneAndUpdate({email} , {$set: {password:newPassword}});
  }
