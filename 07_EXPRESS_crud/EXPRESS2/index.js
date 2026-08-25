import express, { json } from "express";
import httpError from "./middleware/httpError.js";
const app = express();

const tasksList = [
{
    id: 1,
    task: "LEARN JAVASCRIPT",
    description: "Practice Array Methods"
},
{
    id: 2,
    task: "LEARN NODE.JS",
    description: "Practice File System Module"
},
{
    id: 3,
    task: "LEARN EXPRESS.JS",
    description: "Practice Routes and Middleware"
},
{
    id: 4,
    task: "LEARN TYPESCRIPT",
    description: "Practice Types and Interfaces"
},
{
    id: 5,
    task: "LEARN MONGODB",
    description: "Practice Database Queries"
}
];

app.get("/",(req,res)=>{

    res.json({message:"Express Crud"});

})

app.get("/taskList", (req, res) => {

    if (tasksList.length === 0) {
        return res.status(200).json({
            message: "no task available"
        });
    }

    res.status(200).json({
        message: "data added successfully",
        tasksList
    });
});


app.use((error, req, res, next) => {

    if (res.headersSent) {
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server error"
    });

});


const port = 5100;
app.listen(port,(err)=>{

    if(err){
        return console.log(err);
    }

    console.log(`Server running on port ${port}`); 

})