(function(){

/*-----START TYPE TEXT-----*/
	const inputsText = document.querySelectorAll('input[type="text"]');
	inputsText.forEach( text => {
		text.addEventListener('input', function(e){
			if( this.required == false ) return;
			if( this.value[0] === ' ' ) this.value = this.value.slice(1);
			this.value = this.value.replace(/ {1,}/g," ");
		});
		text.addEventListener('change', function(e){
			if( this.required == false ) return;
			if( this.value[this.value.length -1] === ' ' ) this.value = this.value.substring(0, this.value.length - 1);
		});
	});
/*-----END TYPE TEXT-----*/

/*-----START EMAIL-----*/
	const inputsEmail = document.querySelectorAll('input[type="email"]'),
		emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	inputsEmail.forEach( email => {
		email.addEventListener('keydown', function(e){
			if( this.required == false ) return;
			if( e.which == 32 ) e.preventDefault();
		});
		email.addEventListener('change', function(e){
			if( this.required == false ) return;
			if( !emailReg.test(this.value) ){
				alert('Email is wrong!');
				this.focus();
			}
		});
	});
/*-----END EMAIL-----*/

/*-----START PHONE-----*/
	const inputsTel = document.querySelectorAll('input[type="tel"]');
	inputsTel.forEach( tel => {
		tel.addEventListener('keydown', function(e){
			if( this.required == false ) return;
			if( e.which == 32 ) e.preventDefault();
		});
		tel.addEventListener('input', function(e) {
			if( this.required == false ) return;
			if( this.dataset.mask !== 'true' ) return;
			let arr = this.value.replace(/[^\dA-Z]/g, '').replace(/[\s-)(]/g, '').split('');
			if(arr.length >= 1) arr.splice(0, 0, '(');
			if(arr.length > 4) arr.splice(4, 0, ') ');
			if(arr.length > 8) arr.splice(8, 0, '-');
			this.value = arr.toString().replace(/[,]/g, '');
		});
	});
/*-----END PHONE-----*/

/*-----START ZIP-----*/
	const zip = document.getElementById('f_zip');
	zip.addEventListener('keydown', function(e){
		if( e.which == 32 ) e.preventDefault();
	});
	zip.addEventListener('input', function(e) {
		this.value = this.value.replace(/[^\dA-Z]/g, '').replace(/[\s-)(]/g, '');
	});
/*-----END ZIP-----*/

/*-----START CARD NUMBER-----*/
	const card_number = document.getElementById('card_number');
	card_number.addEventListener('keydown', function(e){
		if( e.which == 32 ) e.preventDefault();
	});
	card_number.addEventListener('input', function(e) {
		let arr = this.value.replace(/[^\dA-Z]/g, '').replace(/[\s]/g, '').split('');
		if(arr.length > 4) arr.splice(4, 0, ' ');
		if(arr.length > 9) arr.splice(9, 0, ' ');
		if(arr.length > 14) arr.splice(14, 0, ' ');
		this.value = arr.toString().replace(/[,]/g, '');
	});
/*-----END CARD NUMBER-----*/

/*-----START Expiry Date-----*/
	const expiry_date = document.getElementById('expiry_date');
	expiry_date.addEventListener('keydown', function(e){
		if( e.which == 32 ) e.preventDefault();
	});
	expiry_date.addEventListener('input', function(e) {
		let arr = this.value.replace(/[^\dA-Z]/g, '').replace(/[\s\/]/g, '').split('');
		if(arr.length > 2) arr.splice(2, 0, ' / ');
		this.value = arr.toString().replace(/[,]/g, '');
	});
/*-----END Expiry Date-----*/

/*-----START CVC-----*/
	const card_code = document.getElementById('card_code');
	card_code.addEventListener('keydown', function(e){
		if( e.which == 32 ) e.preventDefault();
	});
	card_code.addEventListener('input', function(e) {
		this.value = this.value.replace(/[^\dA-Z]/g, '');
	});
/*-----END CVC-----*/

})();
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
const serializeArray = form => {
	const serialized = [];

	for (var i = 0; i < form.elements.length; i++) {

		const field = form.elements[i];

		if( field.value.length < field.minLength){
			field.classList.add('not-valid');
			setTimeout(function(){
				field.classList.remove('not-valid');
			}, 1000);
			return false;
		}

		if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

		if( field.name == "expiry_date" ){
			const val = field.value;
			serialized.push({
				name: 'expiry_month',
				value: val.substring(0, 2)
			});
			serialized.push({
				name: 'expiry_year',
				value: val.substring(val.length - 2, val.length)
			});
		}
		if (field.type === 'select-multiple') {
			for (var n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue;
				serialized.push({
					name: field.name,
					value: field.options[n].value
				});
			}
		}else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
			serialized.push({
				name: field.name,
				value: field.value
			});
		}
	}
	return serialized;
};

const form = document.querySelector('#form');
const result = document.querySelector('#result');
form.addEventListener('submit', function(e){
	e.preventDefault();
	result.innerHTML = '';
	result.classList.remove('active');
	const data = serializeArray(form);
	if(data){
		data.forEach( field => {
			result.innerHTML += `<p><b>${field.name}: </b>${field.value}</p>`;
		});
		result.classList.add('active');
	}
});