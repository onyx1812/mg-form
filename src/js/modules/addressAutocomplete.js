//ADDRESS
let autocomplete,
	f_address = document.getElementById('f_address');

function initAutocomplete() {
	autocomplete = new google.maps.places.Autocomplete(
	f_address, {
		types: ['geocode'],
		// componentRestrictions: {
		// 	country: 'US'
		// },
	});
	autocomplete.setFields(['address_component']);
	autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
	let place = autocomplete.getPlace(),
		addressComp = place.address_components,
		addressFull = '';

	if(typeof place.address_components != 'undefined') {
		for (i=0; i<place.address_components.length; i++) {
			let __ = place.address_components[i];
			if( (__.types.indexOf('street_number') != -1) || (__.types.indexOf('postal_code') != -1) ){
				addressFull += __.short_name+' ';
			} else if( (__.types.indexOf('route') != -1) || (__.types.indexOf('locality') != -1) || (__.types.indexOf("administrative_area_level_1") != -1) || (__.types.indexOf("country") != -1) ) {
				addressFull += __.short_name+', ';
			}
		}
	}
	f_address.value = addressFull;
}