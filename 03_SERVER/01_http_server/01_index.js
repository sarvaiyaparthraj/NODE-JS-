const http = require("http");

const server =http.createServer((req,res)=>
{
res.write("hello everyone my name is sarvaiya parthrajsinh im full stake developer")    
res.end();
});

server.listen(3000);

console.log("server running ........")          



