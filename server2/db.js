// const mongoose = require('mongoose');
import mongoose from "mongoose";

const connectDB = async () => {
    console.log(process.env.MONGO_URL);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

// module.exports = connectDB;
export default connectDB;