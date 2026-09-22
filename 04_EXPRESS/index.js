import express from "express";

const foodCart = express();

foodCart.get("/", (req, res) => {
    res.send("Welcome to Food Cart");
});

foodCart.get("/pizza", (req, res) => {
    res.send("Pizza is available ");
});

foodCart.get("/burger", (req, res) => {
    res.send("Burger is available ");
});

const port = 1000;

foodCart.listen(port, (err) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log(`Food Cart Server running on port ${port}`);
});