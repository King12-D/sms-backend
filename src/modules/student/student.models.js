import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  studentid: {
    type: Number,
    require: true,
    unique: true,
  },
  age: {
    type: Number,
    require: true,
    trim: true,
    min: [0, 'Age Must be at least 10'],
    
  },
  studentClass: {
    type: String,
    require: true,
    trim: true,
    enum: ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3']
  },

});
export default mongoose.model('student', studentSchema)