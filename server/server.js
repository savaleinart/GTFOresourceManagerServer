
const http = require('http');

const hostname = '0.0.0.0';
const port = 10000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`listening to port ${port}`)
});

const WebSocket = require("ws")


const wss = new WebSocket.Server({port: 10101})

let dataString = null

wss.on("connection", ws => {
    console.log(`new client connected ! ${wss.clients.size}`)
    ws.send(dataString)
    ws.on("message", data => {
        console.log(`recieved data from client: ${data}`)
        dataString = data
        wss.clients.forEach(client => {
            client.send(dataString)
        })
    })

    ws.on("close", () => {
        console.log("a client has disconnected")
    })
})

