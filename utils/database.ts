import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true); // Tại sao phải là strict Query

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://nhatsang0101:48nJ1AfSQzAeKHoC@cluster0.aup360f.mongodb.net/", {
      dbName: "share_prompt",
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}