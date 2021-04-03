const mongoose= require('mongoose');

const connectDB =async (mongoUri)=>{
    try{
        await mongoose.connect(mongoUri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
        console.log("Mongoose Connected...");
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
    }
}
module.exports = connectDB;