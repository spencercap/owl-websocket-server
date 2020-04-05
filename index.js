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
        // console.log('got message from client:');
        // console.log(data);

        const parts = data.split('/');
        if (parts[0] == 'quat') {
            const x = parts[1],
                y = parts[2],
                z = parts[3],
                w = parts[4];
            console.debug(x, y, z, w);

            // re-broadcast incoming data to other clients
            wss.clients.forEach(function each(client) {
                if (client !== ws) {
                    client.send(data);
                }
            });

        }



    });

    console.log('new conection!');
    ws.send('im da server!');
});

