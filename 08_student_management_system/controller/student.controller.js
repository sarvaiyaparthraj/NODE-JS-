

import httpError from "../middleware/httpError.js";
import Student from "../model/StudentData.js";


const add = async (req,res,next)=>{

    try{

        const {name,email,GRID,Course,isActive} = req.body;

        const newStudent = await new Student({
     
            name,
            email,
            Course,
            GRID,
            isActive

        });

        await newStudent.save();

        res.status(201).json({success:true,message:"Student data added successfully",newStudent})
    }catch(error){

        next(new httpError(error.message,500));

    }

}

// const add = async (req,res,next)=>{

//     try{

//         const {name,email,GRID,Course,isActive} = req.params;

//         const newStudent = {

//               name,
//             email,
//           Course,
//             GRID,
//            isActive

//         }

//         const student = await StudentModel.create(newStudent);

//         if(!student){
//             next(new httpError("failed to add student"));
//         }

//     }catch(error){
//         next(new httpError(error.message,500));
//     }

// }


const studentGetData = async(req,res,next)=>{

    try{

        const student = await Student.find({});

        if(student.length === 0){
          return  res.status(200).json({success:true,message:"no student data found "})
        }

        res.status(200).json({success:true, message:"student data fetched successfully",student});


    }catch(error){
        next(new httpError(error.message,500));
    }
    
}

const studentDataById = async (req,res,next)=>{

    try{

        const {id} = req.params

        const student = await Student.findById(id);

        if(!student){
            return next(new httpError("student not found with this id",404))
        }

        res.status(200).json({success:true,message:"Student found",student})


    }catch(error){
        next(new httpError(error.message,500))
    }
}

const studentDataDelete = async (req,res,next)=>{

    try{

        const { id } = req.params;

        const student = await Student.findByIdAndDelete(id);

        if(!student){
            return next(new httpError("student not delete with id ",400))
        }

        res.status(200).json({success:true,message:"Student data delete successfully "})


    }catch(error){
    next(new httpError(error.message, 500))
    }
}


const deleteAllData = async (req, res, next) => {
  try {
    const student = await Student.deleteMany();

    if (!student) {
      return next(new httpError("failed to delete data", 500));
    }

    res.status(200).json({
      success: true,
      message: "all student data deleted successfully",
    });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};

const StudentUpdateData = async(req,res,next)=>{

    try{

        const {id}  = req.params

        const updateStudent = await Student.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        })

        if(!updateStudent){

            return next(new httpError("student data not updated",400));

        }

       return res.status(200).json({success:true,message:"student data updated successfully",updateStudent})

    }catch(error){
    return next(new httpError(error.message, 500));
    }
    
}

const StudentUpdateManually = async (req,res,next)=>{

    try{

        const {id} = req.params;

        const updateStudent = await Student.findById(id);

        if(!updateStudent){

            return next(new httpError("Student not found with this id", 404))
        }

        const update = Object.keys(req.body);

        const allowedFields = ["name","Course"]

        const ValidUpdate = update.every((u)=> allowedFields.includes(u));

        if(!ValidUpdate){

            return next(new httpError("only allowed field can be update", 400))

        }

        update.forEach((u)=>(
            updateStudent[u] = req.body[u]
        ))

        await updateStudent.save();

        res.status(200).json({success:true,message:"student updated successfully",updateStudent})


    }catch(error){
        return next(new httpError(error.message, 500));
    }

}

   
export default {add,studentGetData,studentDataById,studentDataDelete,deleteAllData,StudentUpdateData,StudentUpdateManually};