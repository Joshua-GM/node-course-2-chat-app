const socket = io();
let user;

function scrollToBottom() {
	// selectors
	let messages =  jQuery('#messages');
	let newMessage =  messages.children('li:last-child');
	// heights
	let clientHeight = messages.prop('clientHeight');
	let scrollTop = messages.prop('scrollTop');
	let scrollHeight = messages.prop('scrollHeight');
	let newMessageHeight = newMessage.innerHeight();
	let lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}

}

jQuery('#message-form, #user').hide();

socket.on('connect', function() {
	console.log('Connected to server');
});

socket.on('disconnect', function(){
	console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let template = jQuery('#message-template').html();
	let html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();
});

socket.on('newLocationMessage', function(message){
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let locationTemplate = jQuery("#location-message-template").html();
	let html = Mustache.render(locationTemplate, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});

	// var li = jQuery('<li></li>');
	// var a = jQuery('<a target="_blank">My Current Location</a>');

	// li.text(`${message.from} ${formattedTime}: `);
	// a.attr('href', message.url);
	// li.append(a);

	jQuery('#messages').append(html);
	scrollToBottom();
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