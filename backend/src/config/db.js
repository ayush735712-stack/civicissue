import mongoose from 'mongoose';

export let isDbConnected = false;

/**
 * MongoDB Mongoose Database Connection Setup
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('⚠️  MONGODB_URI is not defined in environment variables.');
    console.warn('   The backend server will run in in-memory fallback mode until MONGODB_URI is provided.');
    isDbConnected = false;
    // Disable buffering when not connected to prevent timeout delay
    mongoose.set('bufferCommands', false);
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isDbConnected = true;
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    isDbConnected = false;
    mongoose.set('bufferCommands', false);
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    console.warn('   Backend running in in-memory fallback mode until DB connection is established.');
    return false;
  }
};
