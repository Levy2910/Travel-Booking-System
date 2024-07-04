const mongoose = require("mongoose");
const { DB_NAME } = require("../constant");
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`)
            ;
        console.log(
            `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MongoDB connection FAILED ", error);
        process.exit(1);
    }
};

//export default connectDB
module.exports = connectDB;