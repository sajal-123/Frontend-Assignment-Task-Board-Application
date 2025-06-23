import mongoose from "mongoose";
import { ENV } from "../utils/ENV";


const connectDB=async()=>{
    // console.log(`\nConnecting to MongoDB at ${ENV.MONGO_URI}/TaskBoard...`);
try{
    const connectionInstance=await mongoose.connect(`${ENV.MONGO_URI}/TaskBoard`);
    // learn about connectionInstance
    console.log(`\n MongoDb connected !! DB Host : ${connectionInstance.connection.host}`)
}catch(error){
    console.log("Db connection ERROR : ",error)
    process.exit(1);
}
}
export  {connectDB};