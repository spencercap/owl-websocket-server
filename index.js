const SocketServer = require('ws').Server;
const express = require('express')
// init
const app = express()
const PORT = 9000;
let server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`)); // kick off server
const wss = new SocketServer({ server });


// ~~~ Routes ~~~
app.get('/', function (req, res) {
    res.send('Hello World')
})


// ~~~ Websocket ~~~~
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        console.log('got message from client:');
        console.log(data);

        // re-broadcast incoming data
        // wss.clients.forEach(function each(client) {
        //     if (client !== ws && client.readyState === WebSocket.OPEN) {
        //         client.send(data);
        //     }
        // });

    });

    console.log('new conection!');
    ws.send('im da server!');
});

