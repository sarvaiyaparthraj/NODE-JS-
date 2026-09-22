import http from "http";


const server = http.createServer((req,res) => {
  res.writeHead(200, { "content-type": "text/html" });

  res.end("<h1>hello good night</h1>");
})

const port=5000

server.listen(port,(error)=>
{
    if(error)
    {
        return console.log(error.message);
    }

    console.log(`custom server running on ${port}`)
});