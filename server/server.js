const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket)=>{
	console.log('New user connected');

	socket.on('disconnect', (socket)=>{
		console.log('Disconnected from server');
	});
});


server.listen(port, () => console.log(`Server started on port ${port}.`));
