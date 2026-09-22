import express from "express";


const app =express();

app.get("/",(req,res)=>
{
    res.send("hello good night");

});

const port=2000;

app.listen(port,(err)=>
{
    if(err)
    {
        return console.log("err");
    }


    console.log(`server running on port ${port}`);
});  
