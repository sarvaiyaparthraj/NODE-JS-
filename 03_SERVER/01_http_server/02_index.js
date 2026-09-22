const { listenerCount } = require("cluster");
const http = require("http");

const server = http.createServer((req,res)=>{
res.write ("<h1>Hello Student </h1>")
res.write ("<h1>Welcome To My Shope</h2>")
res.end();
});

server.listen(3500);
console.log("server running .......");