$(document).ready( function() {
	$.ajax({
		url: 'http://0.0.0.0:5001/api/v1/places_search/',
		type: 'POST',
		contentType: 'application/json',
		data: {},
		success: function(response) {
			response.each(function() {
				let guestType = $(this).max_guest === 1 ? 'Guest' : 'Guests';
				let roomType = $(this).number_rooms === 1 ? 'Bedroom' : 'Bedrooms';
				let bathroomType = $(this).number_bathrooms === 1 ? 'Bathroom' : 'Bathrooms';
				$('section.places').append(`
	<article>
	  <div class="title_box">
	    <h2>${$(this).name}</h2>
	    <div class="price_by_night">\$${$(this).price_by_night}</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">${$(this).max_guest} ${guestType}</div>
            <div class="number_rooms">${$(this).number_rooms} ${roomType}</div>
            <div class="number_bathrooms">${$(this).number_bathrooms} ${bathroomType}</div>
	  </div>
	  <div class="user">
            <b>Owner:</b> ${$(this).user.first_name} ${$(this).user.last_name}
          </div>
          <div class="description">
	    ${$(this).description}
          </div>
	</article>`)}
	)}
	})
});
