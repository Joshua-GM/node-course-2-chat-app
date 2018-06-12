const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

const {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
	console.log('New user connected');

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

		socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	socket.on('createMessage', (message)=>{
		console.log('createMessage',message);

		io.emit('newMessage', generateMessage(message.from, message.text));
		
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	// socket.emit('newMessage', {
	// 	from: "Jplogger1234",
	// 	text: "Nope. Out now",
	// 	createdAt: Date.now()

	// });


	// socket.emit('newEmail', {
	// 	from: "mike@example.com",
	// 	text: "Hey. What is going on?",
	// 	createAt: 123
	// });

	// socket.on('createEmail', (newEmail)=>{
	// 	console.log('createEmail', newEmail);
	// });

	socket.on('disconnect', (socket)=>{
		console.log('Disconnected from server');
	});
});


server.listen(port, () => console.log(`Server started on port ${port}.`));
