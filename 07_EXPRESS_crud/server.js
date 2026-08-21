
import express from "express";



const app = express();


const student = [
    {
        id:1,
        name:"alice",
        details:"my name is alice my std fsd "
    },
        {
        id: 2,
        name: "charlie",
        details: "my name is charlie my std fsd"
    },
    {
        id: 3,
        name: "david",
        details: "my name is david my std fsd"
    }
];

app.get("/",(req,res)=>{
    res.json({Message:"Express Crud Operation"})
})


// Get All Students
app.get("/student", (req, res, next) => {

    if (student.length === 0) {
        return res.status(200).json({
            message: "No student data available"
        });
    }

    res.status(200).json({
        message: "Student data fetched successfully",
        student: student
    });

});

// Undefined Route Middleware
app.use((req, res, next) => {

    const error = new Error("Request not found");
    error.statusCode = 404;

    return next(error);

});

// Error Handling Middleware
app.use((error, req, res, next) => {

    if (res.headersSent) {
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error"
    });

});

const port = 5000;

app.listen(port,(err)=>{

    if(err){
        return console.log(err);

    }
    console.log(`server running on port ${port}`);
})
