import mongoose, { model, Schema } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});

const Contact=mongoose.models.Contact ||new model("Contact",contactSchema)

export default Contact