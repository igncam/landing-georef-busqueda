const entidadSelect = document.querySelector('#entidadSelect');

// selects form
const provinciaSelect = document.querySelector('#provinciaSelect');
const municipioSelect = document.querySelector('#municipioSelect');
const departamentoSelect = document.querySelector('#departamentoSelect');
const localidadSelect = document.querySelector('#localidadSelect');
const buscarInput = document.querySelector('#buscarInput');
const buscarButton = document.querySelector('#buscarButton');

// inicio todo en disabled
provinciaSelect.disabled = true;
departamentoSelect.disabled = true;
municipioSelect.disabled = true;
localidadSelect.disabled = true;
buscarInput.disabled = true;
buscarButton.disabled = true;

entidadSelect.addEventListener('change', (e) => {
	loadSelect(provinciaSelect, getProvincias());

	switch (e.target.value) {
		case 'provincias':
			provinciaSelect.disabled = false;
			departamentoSelect.disabled = true;
			municipioSelect.disabled = true;
			localidadSelect.disabled = true;
			buscarInput.disabled = false;
			buscarButton.disabled = false;
			break;

		case 'departamentos':
			provinciaSelect.disabled = false;
			municipioSelect.disabled = true;
			departamentoSelect.disabled = false;
			localidadSelect.disabled = true;
			buscarInput.disabled = false;
			buscarButton.disabled = false;
			break;

		case 'municipios':
			provinciaSelect.disabled = false;
			departamentoSelect.disabled = false;
			municipioSelect.disabled = false;
			localidadSelect.disabled = true;
			buscarInput.disabled = false;
			buscarButton.disabled = false;
			break;

		case 'select':
			provinciaSelect.disabled = true;
			departamentoSelect.disabled = true;
			municipioSelect.disabled = true;
			localidadSelect.disabled = true;
			buscarInput.disabled = true;
			buscarButton.disabled = true;
			break;

		default:
			provinciaSelect.disabled = false;
			departamentoSelect.disabled = false;
			municipioSelect.disabled = false;
			localidadSelect.disabled = false;
			buscarInput.disabled = false;
			buscarButton.disabled = false;
			break;
	}
});

provinciaSelect.addEventListener('change', (e) => {
	// si es completo no ejecuto la llamda a la api
	if (e.target.value != 'completo') {
		getDepartamentosByIdProvincia(e.target.value).then((resp) =>
			loadSelect(departamentoSelect, resp)
		);
	} else {
		loadSelect(departamentoSelect, []);
	}
});

departamentoSelect.addEventListener('change', (e) => {
	if (e.target.value != 'completo') {
		console.log(provinciaSelect.value);
		getMunicipiosByIdProvincia(provinciaSelect.value).then((resp) =>
			loadSelect(municipioSelect, resp)
		);
	} else {
		loadSelect(municipioSelect, []);
	}
});

municipioSelect.addEventListener('change', (e) => {
	if (e.target.value != 'completo') {
		getLocalidades(
			provinciaSelect.value,
			departamentoSelect.value,
			e.target.value
		).then((resp) => loadSelect(localidadSelect, resp));
	} else {
		loadSelect(localidadSelect, []);
	}
});

const loadSelect = (selectElement, data) => {
	selectElement.innerHTML = '';
	for (const e of data) {
		var opt = document.createElement('option');
		opt.value = e.id;
		opt.innerHTML = e.nombre;
		selectElement.appendChild(opt);
	}

	const allDefaultSelect = document.createElement('option');
	allDefaultSelect.value = 'completo';
	allDefaultSelect.defaultSelected = true;
	allDefaultSelect.innerHTML = 'Completo';
	selectElement.appendChild(allDefaultSelect);
};
