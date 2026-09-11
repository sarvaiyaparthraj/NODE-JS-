import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  age: {
    type: Number,
    required: true,
  },

  course: {
    type: String,
    required: true,
  },
});

const StudentData = mongoose.model("StudentData", StudentSchema);

export default StudentData;