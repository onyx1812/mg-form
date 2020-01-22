//= modules/formValidation.js
//= modules/addressAutocomplete.js
//= modules/formSerialize.js

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