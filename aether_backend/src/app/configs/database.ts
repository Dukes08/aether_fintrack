import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '', {
      dbName: 'Aether',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDb;