import mongoose from "mongoose";

const connectDB =async(dbUrl,dbName)=>{
    const DBOPTIONS ={
        dbName:dbName
    }
    try {
        await mongoose.connect(dbUrl,DBOPTIONS)
        console.log('database connected successfully');
    } catch (error) {
        console.log(error);
    }
}


export default connectDB