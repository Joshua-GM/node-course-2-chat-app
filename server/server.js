const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString,isNameExist} = require('./utils/validation');
const {Users} = require('./utils/users');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket)=>{
	console.log('New user connected');

	//first time will be empty array as it hasn't approached addUser method below
	// only subsequent connection will have the data
	// need to look at sending the info back to index.html
	let userlist = users.users;
	let userRooms = [];
	if (userlist.length != 0) {
		userlist.forEach((user)=>{
			userRooms.indexOf(user.room) === -1 ? userRooms.push(user.room) : '';
		});		
	}

	socket.on('join', (params, callback)=>{
		if ( !isRealString(params.name) || ( !isRealString(params.room))) {
			return callback('Name and room name are required');
		}

		let user = users.getUserList(params.room)[0];

		if (user !== undefined && isNameExist(params.name, user)) {
			return callback('Name already exist!');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		//io.emit - transmit to all users connected
		//socket.broadcast.emit - sends to all connected users except for the current user
		//socket.emit - emits an event to specifically one user
		// e.g. 
		// io.to('The Office Fans').emit
		// socket.broadcast.to('The Office Fans').emit

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

		callback();
	});


	socket.on('createMessage', (message, callback)=>{
		let user = users.getUser(socket.id);
		if (user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));			
		}

		callback();

	});

	socket.on('createLocationMessage', (coords) => {
		let user = users.getUser(socket.id);
		if (user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));			
		}
	});

	socket.on('disconnect', ()=>{
		let user = users.removeUser(socket.id);
		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the building!`));
		}
	});
});


server.listen(port, () => console.log(`Server started on port ${port}.`));
