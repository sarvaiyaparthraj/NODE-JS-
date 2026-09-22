const fs = require("fs");

fs.writeFileSync("npm.mp4", "mp4 made by me");

const data = fs.readFileSync("npm.mp4", "mp4");

console.log(data)