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
	resetSelects([municipioSelect, departamentoSelect, localidadSelect]);
	switch (e.target.value) {
		case 'provincias':
			provinciaSelect.disabled = false;
			departamentoSelect.disabled = true;
			municipioSelect.disabled = true;
			localidadSelect.disabled = true;
			buscarInput.disabled = true;
			buscarButton.disabled = false;
			break;

		case 'departamentos':
			provinciaSelect.disabled = false;
			municipioSelect.disabled = true;
			departamentoSelect.disabled = false;
			localidadSelect.disabled = true;
			buscarInput.disabled = true;
			buscarButton.disabled = false;
			break;

		case 'municipios':
			provinciaSelect.disabled = false;
			departamentoSelect.disabled = false;
			municipioSelect.disabled = false;
			localidadSelect.disabled = true;
			buscarInput.disabled = true;
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

		case 'calles':
			provinciaSelect.disabled = false;
			departamentoSelect.disabled = false;
			municipioSelect.disabled = false;
			localidadSelect.disabled = false;
			buscarInput.disabled = false;
			buscarButton.disabled = false;
			break;

		default:
			provinciaSelect.disabled = false;
			departamentoSelect.disabled = false;
			municipioSelect.disabled = false;
			localidadSelect.disabled = false;
			buscarInput.disabled = true;
			buscarButton.disabled = false;
			break;
	}
});

provinciaSelect.addEventListener('change', (e) => {
	// si es completo no ejecuto la llamda a la api
	resetSelects([municipioSelect, departamentoSelect, localidadSelect]);

	if (e.target.value != 'completo') {
		getDepartamentosByIdProvincia(e.target.value).then((resp) =>
			loadSelect(departamentoSelect, resp)
		);
	} else {
		loadSelect(departamentoSelect, []);
	}
});

departamentoSelect.addEventListener('change', (e) => {
	if (
		(e.target.value != 'completo') &
		(entidadSelect.value != 'departamentos')
	) {
		getMunicipiosByIdProvincia(e.target.value).then((resp) =>
			loadSelect(municipioSelect, resp)
		);
	} else {
		loadSelect(municipioSelect, []);
	}
});

municipioSelect.addEventListener('change', (e) => {
	if ((e.target.value != 'completo') & (entidadSelect.value != 'municipios')) {
		getLocalidades(
			provinciaSelect.value,
			departamentoSelect.value,
			e.target.value
		).then((resp) => loadSelect(localidadSelect, resp));
	} else {
		loadSelect(localidadSelect, []);
	}
});

buscarButton.addEventListener('click', (e) => {
	document.querySelector('#ponchoTable').classList.add('state-loading');

	switch (entidadSelect.value) {
		case 'provincias':
			const options = {
				jsonData: getProvincias(10),
				tituloTabla: 'tabla',
				ordenColumna: 1,
				ordenTipo: 'asc',
				ocultarColumnas: [],
				cantidadItems: 10,
			};
			ponchoTable(options);
			break;
		case 'departamentos':
			getDepartamentosByIdProvincia(provinciaSelect.value, {
				max: 30,
				campos: ['id', 'nombre', 'provincia.id', 'provincia.nombre'],
			}).then((e) => {
				const options = {
					jsonData: e,
					tituloTabla: 'tabla',
					ordenColumna: 1,
					ordenTipo: 'asc',
					ocultarColumnas: [],
					cantidadItems: 10,
				};
				ponchoTable(options);
			});
			break;
		case 'municipios':
			getMunicipiosByIdProvincia(departamentoSelect.value, {
				max: 10,
				campos: ['provincia.id', 'provincia.nombre', 'id', 'nombre'],
			}).then((e) => {
				const options = {
					jsonData: e,
					tituloTabla: 'tabla',
					ordenColumna: 1,
					ordenTipo: 'asc',
					ocultarColumnas: [],
					cantidadItems: 10,
				};
				ponchoTable(options);
			});
			break;
		case 'localidades':
			getLocalidades(
				provinciaSelect.value,
				departamentoSelect.value,
				municipioSelect.value,
				{
					max: 10,
					campos: [
						'id',
						'nombre',
						'provincia.id',
						'provincia.nombre',
						'departamento.id',
						'departamento.nombre',
						'municipio.id',
						'municipio.nombre',
					],
				}
			).then((e) => {
				const options = {
					jsonData: e,
					tituloTabla: 'tabla',
					ordenColumna: 1,
					ordenTipo: 'asc',
					ocultarColumnas: [],
					cantidadItems: 10,
				};
				ponchoTable(options);
			});
			break;
		default:
			break;
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

const resetSelects = (selectElements) => {
	for (const e of selectElements) {
		e.innerHTML = '';
		const allDefaultSelect = document.createElement('option');
		allDefaultSelect.value = 'completo';
		allDefaultSelect.defaultSelected = true;
		allDefaultSelect.innerHTML = 'Completo';
		e.appendChild(allDefaultSelect);
	}

	console.log('Se resetearon los selects');
};
