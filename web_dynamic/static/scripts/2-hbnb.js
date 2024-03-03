$(document).ready( function() {
	url = 'http://0.0.0.0:5001/api/v1/status/'
	$.get(url, function(data) {
		const apiStatusEle = $('DIV#api_status');
		const apiStatus = data.status;
		if (apiStatus === 'OK') {
			apiStatusEle.addClass('available');
		}
	});
});
