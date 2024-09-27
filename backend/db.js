import mongoose, { model } from "mongoose";

const connectToDb = async () => {
  await mongoose.connect(process.env.MONGO_URI).then((res) => {
    console.log("connect db");
  });
};

export default connectToDb;

// const schema=new mongoose.Schema({
//     name: String,
//     number: String,
// })

// export default mongoose.model("Number",schema)
