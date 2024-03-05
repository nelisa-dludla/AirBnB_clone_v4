$(document).ready(function() {
	/* Handles amenities filter selection */
	let checkedAmenities = {};
	let listItemsEle = $('DIV.amenities DIV.popover INPUT');
	listItemsEle.each(
		function() {
			$(this).click(
				function() {
					/* Retrieve the amenity name and id from data attributes */
					const amenityId = $(this).attr('data-id');
					const amenityName = $(this).attr('data-name');
					/* Check if current list item is checked and if the dictionary has the current amenity stored */
					if ($(this).not(':checked') && checkedAmenities.hasOwnProperty(amenityName)) {
						delete checkedAmenities[amenityName];
						/* Change the contents of the h4 element */
						if (Object.keys(checkedAmenities).length === 0) {
							const hFourEle = $('DIV.amenities H4');
							hFourEle.html('&nbsp;');
						} else {
							amenitiesList = Object.keys(checkedAmenities);
							str = amenitiesList.join(', ')
							/* Change the contents of the h4 element */
							const hFourEle = $('DIV.amenities H4');
							hFourEle.html(str);
						}
					} else {
						checkedAmenities[amenityName] = amenityId;
						amenitiesList = Object.keys(checkedAmenities);
						str = amenitiesList.join(', ')
						/* Change the contents of the h4 element */
						const hFourEle = $('DIV.amenities H4');
						hFourEle.html(str);
					}
				}
			);
		}
	);
	/* Handles api status indicator */
	url = 'http://0.0.0.0:5001/api/v1/status/'
	$.get(url, function(data) {
		const apiStatusEle = $('DIV#api_status');
		const apiStatus = data.status;
		if (apiStatus === 'OK') {
			apiStatusEle.addClass('available');
		}
	});
	// Fetches the places data
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(response) {
            $.each(response, function(index, place) {
                let guestType = place.max_guest === 1 ? 'Guest' : 'Guests';
                let roomType = place.number_rooms === 1 ? 'Bedroom' : 'Bedrooms';
                let bathroomType = place.number_bathrooms === 1 ? 'Bathroom' : 'Bathrooms';
                $('section.places').append(`
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} ${guestType}</div>
                            <div class="number_rooms">${place.number_rooms} ${roomType}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} ${bathroomType}</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`);
            });
        }
    });
});
