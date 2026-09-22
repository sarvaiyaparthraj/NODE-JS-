

import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{

        type:String,
        required:true,
        unique:true
    },
    GRID:{
        type:Number,
        required:true,
        unique:true
    },
    Course:{
       type:String,
       enum:["Engineer","Teacher","Police","Army"],
       required:true,
       default:"Engineer"
    },
    isActive:{
        type:String,
        enum:["Active","Pending","Hold","Suspend"],
        default:"Active"
    }
})

const Student = mongoose.model("StudentData",StudentSchema);

export default Student;