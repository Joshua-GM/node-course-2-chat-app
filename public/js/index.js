const socket = io();
let user;

jQuery('#message-form, #user').hide();

socket.on('connect', function() {
	console.log('Connected to server');
});

socket.on('disconnect', function(){
	console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
	let formattedTime = moment(message.createdAt).format('h:mm a');

	console.log('New Message', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from} ${formattedTime}: ${message.text}`);

	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
	let formattedTime = moment(message.createdAt).format('h:mm a');

	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My Current Location</a>');

	li.text(`${message.from} ${formattedTime}: `);
	a.attr('href', message.url);
	li.append(a);

	jQuery('#messages').append(li);
});

jQuery("#username-form").on('submit', function(e){
	e.preventDefault();
	user = jQuery('[name=username').val();
	let useradd=`<strong>${user}</strong>`;
	jQuery("#username-form").hide();
	jQuery("#user").append(useradd);
	jQuery('#message-form, #user').show();

});

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();

	let messageTextBox = jQuery('[name=message]');

	socket.emit('createMessage', {
		from: user,
		text: messageTextBox.val()
	}, function() {
		messageTextBox.val('');
	});
});

var locationButton = jQuery("#send-location");
locationButton.on('click', function(){
	if (!navigator.geolocation) {
		return alert('Not supported by your browser!');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location..');
	
	navigator.geolocation.getCurrentPosition(function(
		position){
		locationButton.removeAttr('disabled').text('Send location');
		
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});

	}, function(){
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location!');
	});
});