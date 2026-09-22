import express from "express";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));


// ================= STUDENT DATA =================

let StudentData = [
    {
        id: 1,
        name: "Alice",
        age: 20
    },
    {
        id: 2,
        name: "Dexter",
        age: 22
    },
    {
        id: 3,
        name: "Parth",
        age: 21
    },
    {
        id: 4,
        name: "Rahul",
        age: 23
    }
];


// ================= HOME =================

app.get("/", (req, res) => {

    res.render("index", { StudentData });

});


// ================= ADD PAGE =================

app.get("/add", (req, res) => {

    res.render("add");

});


// ================= ADD STUDENT =================

app.post("/add", (req, res) => {

    const { name, age } = req.body;

    const newStudent = {
        id: new Date().getTime(),
        name,
        age
    };

    StudentData.push(newStudent);

    res.redirect("/");

});


// ================= DELETE STUDENT =================

app.get("/delete/:id", (req, res) => {

    const { id } = req.params;

    const student = StudentData.find(
        (s) => s.id === Number(id)
    );

    if (!student) {

        return res.json({
            message: "Student Not Found"
        });

    }

    StudentData = StudentData.filter(
        (s) => s.id !== Number(id)
    );

    res.redirect("/");

});


// ================= EDIT PAGE =================

app.get("/edit/:id", (req, res) => {

    const { id } = req.params;

    const student = StudentData.find(
        (s) => s.id === Number(id)
    );

    if (!student) {

        return res.json({
            message: "Student Not Found"
        });

    }

    res.render("edit", { student });

});


// ================= UPDATE STUDENT =================

app.post("/edit/:id", (req, res) => {

    const { id } = req.params;

    const student = StudentData.find(
        (s) => s.id === Number(id)
    );

    if (!student) {

        return res.json({
            message: "Student Not Found"
        });

    }

    const { name, age } = req.body;

    student.name = name;
    student.age = age;

    res.redirect("/");

});


// ================= SERVER =================

const port = 3000;

app.listen(port, (error) => {

    if (error) {
        console.log(error);
        return;
    }

    console.log(`My server running on port ${port}`);

});