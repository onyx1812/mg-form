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