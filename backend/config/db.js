const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/chit-chat',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`MongoDB connected Successfully`);
    } catch (error) {
        console.log(`Error Occured ${error.message}`);
        process.exit();
    }
}
module.exports = connectDB;