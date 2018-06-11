const socket = io();
socket.on('connect', function() {
	console.log('Connected to server');

// 	socket.emit('createEmail', {
// 		to: "jen@example.com",
// 		text: "Hey. this is Jen"
// 	});

	socket.emit('createMessage', {
		from: "joshua1234",
		text: "Hey, are u on PUBG now?"
	})
});

socket.on('newMessage', function(message){
	console.log('New Message', message);
});

socket.on('disconnect', function(){
	console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
// 	console.log('New Email', email);
// });