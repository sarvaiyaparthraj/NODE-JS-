import express from "express";

const app= express();

app.set ("view engine","ejs")

app.use(express.urlencoded({ extended:true}));

const StudentData=[
    {
        name:"alice",
        age:20
    },

    {
        name:"Dexter",
        age:22
    }
];

app.get("/",(req,res)=>{
    res.render("index",{StudentData})
})

app.get("/add", (req, res) => {

    res.render("add");

});

app.post("/add", (req, res) => {

    const { name, age } = req.body;

    const newStudent = {

        id: new Date().getTime(),
        name,
        age

    };

    StudentList.push(newStudent);

    res.redirect("/");

});

const port = 3000;

app.listen(port, (error) => {

    if (error) {
        console.log(error);
    }

    console.log(`My server running on port ${port}`);

});