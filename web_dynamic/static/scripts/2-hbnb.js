$(document).ready( function() {
	url = 'http://0.0.0.0:5001/api/v1/status/'
	$.get(url, function(data) {
		console.log(data)
	});
});
