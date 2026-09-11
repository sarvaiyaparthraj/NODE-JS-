import httpError from "../middleware/httpError.js";
import Student from "../model/StudentData.js";


const add = async (req,res,next)=>{

    try{

        const {name,email,GRID,Course,isActive} = req.body;

        const newStudent = await new Student({
     
            name,email,Course,GRID,isActive

        });

        await newStudent.save();

        res.status(201).json({success:true,message:"Student data added successfully",newStudent})
    }catch(error){

        next(new httpError(error.message,500));

    }

}

export default add;