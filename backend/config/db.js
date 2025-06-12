import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        // Exit process with failure
        // This is important for the server to stop if the database connection fails
        // and to avoid running the server without a database connection
        // This is especially important in production environments
        // where you want to ensure that the application is not running without a database
        // connection
        process.exit(1);
    }
}