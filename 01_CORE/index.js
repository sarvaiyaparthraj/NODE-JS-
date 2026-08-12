const fs = require("fs");

fs.writeFileSync("file.txt", "Hello World");

const data = fs.readFileSync("file.txt");

console.log("File Created Successfully");