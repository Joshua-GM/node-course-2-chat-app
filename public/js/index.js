const socket = io();
socket.on('connect', function() {
	console.log('Connected to server');

// 	socket.emit('createEmail', {
// 		to: "jen@example.com",
// 		text: "Hey. this is Jen"
// 	});

// 	socket.emit('createMessage', {
// 		from: "joshua1234",
// 		text: "Hey, are u on PUBG now?"
// 	})

});

socket.on('newMessage', function(message){
	console.log('New Message', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

socket.on('disconnect', function(){
	console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function() {

	});
});