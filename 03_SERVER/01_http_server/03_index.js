const http = require("http");


http
.createServer((req,res)=>{
res.write ("<h1>Welcome Red&White</h2>");
res.end
})
.listen(5141);
console.log("server running .......");