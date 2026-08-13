import express from "express"

const app = express();

app.get("/",(req,res)=>{

    res.send("my server is running");
})

app.get("/about", (req,res)=>{
    res.json({page:"this is about section"})

})

app.use("/json", (req,res,next)=>{
    res.json({page: "this is json format"})
})

const person =[

{

    name:"alice",
    age: 20,
    id:124,
},

{
    name:"parth",
    age: 20,
    id:14,
    course: "fsd"

}

]

app.use("/person",(req,res,next)=>{
    res.json(person);
})

const port = 1914

app.listen(port,(err)=>{
    if (err){
        console.log(err)
        return;

    }


    console.log(`server running port $ {port}`)

})