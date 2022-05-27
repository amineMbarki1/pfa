const mongoose = require('mongoose');

const db = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_LOCAL_URI);
    console.log('Connected to mongodb');
  } catch (error) {
    console.log(error, 'Eroor connecting to db');
  }
};

module.exports = db;
