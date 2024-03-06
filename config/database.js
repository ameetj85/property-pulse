import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  /*
    const mongoose = require('mongoose');​
    mongoose.connect('ConnectionString', {useNewUrlParser: true, useUnifiedTopology: true});
  */
  mongoose.set('strictQuery', true);

  // if db is already connected dont reconnect
  if (connected) {
    console.log('Mongo DB is already connected.');
    return;
  }

  // connect to Mongo DB
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connected = true;
    console.log('Mongo DB connected.');
  } catch (error) {
    console.log(
      '***************** Failed to connect to MongoDB ! ***************** '
    );
    console.error(error);
  }
};

export default connectDB;
