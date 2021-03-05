#!/usr/bin/env node

const http = require('http');
const readline = require('readline');
const WebSocketServer = require('websocket').server;

const PORT = 5110;



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const server = http.createServer(function(req, res) {
    res.writeHead(404);
    res.end();
});



const wss = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});



var conn = null;

wss.on('request', function(req) {
    if(!conn) {
        conn = req.accept();

        console.log("\n# CONNECTION OPENED");
    }
    else
    {
        request.reject();
        return;
    }

    conn.on('message', function(msg) {
        console.log(`\n< ${msg.utf8Data}`);
        rl.prompt();
    });

    conn.on('close', function(reason, desc) {
        conn = null;

        console.log("\n# CONNECTION CLOSED");
    });
});

rl.on('line', function(input) {
    if(conn) {
        conn.sendUTF(input);
    }
});



server.listen(PORT);

rl.on('SIGINT', function() {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)\n');
    wss.shutDown();
    process.exit();
});

