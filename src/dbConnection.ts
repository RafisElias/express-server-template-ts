import mongoose from 'mongoose';
import config from 'config';

const MONGODB_URI = config.get<string>('MONGO_URI');

export default async function connectDataBase() {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
}
