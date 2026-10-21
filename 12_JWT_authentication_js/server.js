
import express from "express";
import httpError from "./middleware/httpError.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./router/userRouter.js"

dotenv.config({path:"./.env"});

const app = express();

app.use(express.json());

app.use("/user",userRoutes)

app.get("/",(req,res)=>{

    res.json("hello from server !");

})

app.use((req,res,next)=>{

    return next(new httpError("Request routes not found",404));

})

app.use((error,req,res,next)=>{

    if(res.headersSent){

        return next(error)
    }

    res.status(error.statusCode || 500).json({message:error.message || "internal server error"});

})


const port = process.env.PORT || 5000;

async function startServer() {

    try{

        const connect = await connectDB();

        if(!connect){
        
            throw new Error("connect db failed");

        }

        app.listen(port,(error)=>{

            if(error){
                console.log(error.message)
            }

            console.log(`server running on port ${port}`);

        })

    }catch(error){

        throw new Error(error.message)

    }
    
}

startServer();