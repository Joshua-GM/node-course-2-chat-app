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
	console.log('New Message', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My Current Location</a>');

	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);

	jQuery('#messages').append(li);
});

jQuery("#username-form").on('submit', function(e){
	e.preventDefault();
	user = jQuery('[name=username').val();
	let useradd=`User: ${user}`;
	jQuery("#username-form").hide();
	jQuery("#user").text(useradd);
	jQuery('#message-form, #user').show();

});

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();

	socket.emit('createMessage', {
		from: user,
		text: jQuery('[name=message]').val()
	}, function() {

	});
});

var locationButton = jQuery("#send-location");
locationButton.on('click', function(){
	if (!navigator.geolocation) {
		return alert('Not supported by your browser!');
	}
	navigator.geolocation.getCurrentPosition(function(position){
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});

	}, function(){
		alert('Unable to fetch location!');
	});
});