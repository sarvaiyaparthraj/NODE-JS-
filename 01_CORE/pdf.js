const fs = require("fs");

fs.writeFileSync("text.pdf","pdf create by me hello");

const data = fs.readFileSync("text.pdf");

console.log(data)