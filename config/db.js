import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Use the URI from environment variables
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('MongoDB connection error:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
