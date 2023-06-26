const entidadSelect = document.querySelector('#entidadSelect');

// selects form
const provinciaSelect = document.querySelector('#provinciaSelect');
const municipioSelect = document.querySelector('#municipioSelect');
const departamentoSelect = document.querySelector('#departamentoSelect');

const localidadSelect = document.querySelector('#localidadSelect');
const buscarInput = document.querySelector('#buscarInput');
const buscarButton = document.querySelector('#buscarButton');
const divDescargar = document.querySelector('#divDescargar');
const formatoSelect = document.querySelector('#formatoSelect');
const descargarButton = document.querySelector('#descargarButton');

// inicio todo en disabled
provinciaSelect.disabled = true;
departamentoSelect.disabled = true;
municipioSelect.disabled = true;
localidadSelect.disabled = true;
buscarInput.disabled = true;
buscarButton.disabled = true;

entidadSelect.addEventListener('change', (e) => {
	loadSelect(provinciaSelect, getProvincias({ max: 30 }).data);
	formatoSelect.value = 'default';
	descargarButton.href = '';
	resetSelects([municipioSelect, departamentoSelect, localidadSelect]);
	switch (e.target.value) {
		case 'provincias':
			provinciaSelect.disabled = true;
			departamentoSelect.disabled = true;
			municipioSelect.disabled = true;
			localidadSelect.disabled = true;
			buscarInput.disabled = true;
			buscarButton.disabled = false;
			break;

		case 'departamentos':
			provinciaSelect.disabled = false;
			municipioSelect.disabled = true;
			departamentoSelect.disabled = true;
			localidadSelect.disabled = true;
			buscarInput.disabled = true;
			buscarButton.disabled = false;
			break;

		case 'municipios':
			provinciaSelect.disabled = false;
			departamentoSelect.disabled = false;
			municipioSelect.disabled = true;
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
		const params = {
			provincia: provinciaSelect.value,
			campos: ['id', 'nombre', 'provincia.id', 'provincia.nombre'],
			max: 300,
			orden: 'nombre',
			aplanar: true,
		};
		getDepartamentosByIdProvincia(params).then((resp) =>
			loadSelect(departamentoSelect, resp.data)
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
		var params = {
			interseccion: `departamento: ${e.target.value}`,
			campos: ['id', 'nombre'],
			max: 300,
			orden: 'nombre',
			aplanar: true,
			IdDep: departamentoSelect.value.substring(
				departamentoSelect.value.length - 3
			),
		};

		if (e.target.value === 'completo') {
			delete params[interseccion];
		}

		getMunicipiosByIdDepartamento(params).then((resp) =>
			loadSelect(municipioSelect, resp.data)
		);
	} else {
		loadSelect(municipioSelect, []);
	}
});

municipioSelect.addEventListener('change', (e) => {
	const params = {
		provincia: provinciaSelect.value,
		departamento: departamentoSelect.value,
		municipio: municipioSelect.value,
		campos: ['id', 'nombre'],
		max: 300,
		orden: 'nombre',
		aplanar: true,
	};
	if ((e.target.value != 'completo') & (entidadSelect.value != 'municipios')) {
		getLocalidades(params).then((resp) =>
			loadSelect(localidadSelect, resp.data)
		);
	} else {
		loadSelect(localidadSelect, []);
	}
});
formatoSelect.addEventListener('change', (e) => {
	const parsedUrl = new URL(descargarButton.href);
	const searchParams = parsedUrl.searchParams;
	searchParams.delete('formato');
	searchParams.delete('campos');
	searchParams.delete('aplanar');
	searchParams.delete('max');
	console.log(parsedUrl.toString());
	descargarButton.href = `${parsedUrl}&formato=${formatoSelect.value}&max=5000`;
});
buscarButton.addEventListener('click', (e) => {
	document.querySelector('#ponchoTable').classList.add('state-loading');
	formatoSelect.value = 'default';
	descargarButton.href = '';
	var params = {};
	switch (entidadSelect.value) {
		case 'provincias':
			const options = {
				jsonData: getProvincias({ max: 30 }).data,
				tituloTabla: 'tabla',
				ordenColumna: 1,
				ordenTipo: 'asc',
				ocultarColumnas: [],
				cantidadItems: 10,
			};
			divDescargar.style.display = '';
			descargarButton.href = getProvincias({ max: 30 }).url;
			ponchoTable(options);
			break;
		case 'departamentos':
			params = {
				provincia: provinciaSelect.value,
				campos: ['id', 'nombre', 'provincia.id', 'provincia.nombre'],
				max: 30,
				orden: 'nombre',
				aplanar: true,
			};
			getDepartamentosByIdProvincia(params).then((e) => {
				const options = {
					jsonData: e.data,
					tituloTabla: 'tabla',
					ordenColumna: 1,
					ordenTipo: 'asc',
					ocultarColumnas: [],
					cantidadItems: 10,
				};
				divDescargar.style.display = '';
				descargarButton.href = e.url;
				ponchoTable(options);
			});
			break;
		case 'municipios':
			params = {
				provincia: provinciaSelect.value,
				interseccion: `departamento: ${departamentoSelect.value}`,
				IdDep: departamentoSelect.value.substring(
					departamentoSelect.value.length - 3
				),
				campos: ['id', 'nombre', 'provincia.id', 'provincia.nombre'],
				max: 10,
				orden: 'nombre',
				aplanar: true,
			};

			if (departamentoSelect.value === 'completo') {
				delete params['interseccion'];
			}
			getMunicipiosByIdDepartamento(params).then((e) => {
				const options = {
					jsonData: e.data,
					tituloTabla: 'tabla',
					ordenColumna: 1,
					ordenTipo: 'asc',
					ocultarColumnas: [],
					cantidadItems: 10,
				};
				divDescargar.style.display = '';
				descargarButton.href = e.url;
				ponchoTable(options);
			});
			break;
		case 'localidades':
			params = {
				provincia: provinciaSelect.value,
				departamento: departamentoSelect.value,
				municipio: municipioSelect.value,
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
				max: 300,
				orden: 'nombre',
				aplanar: true,
			};
			getLocalidades(params).then((e) => {
				const options = {
					jsonData: e.data,
					tituloTabla: 'tabla',
					ordenColumna: 1,
					ordenTipo: 'asc',
					ocultarColumnas: [],
					cantidadItems: 10,
				};
				divDescargar.style.display = '';
				descargarButton.href = e.url;
				ponchoTable(options);
			});
			break;
		case 'calles':
			params = {
				provincia: provinciaSelect.value,
				departamento: departamentoSelect.value,
				localidad_censal: localidadSelect.value,
				nombre: buscarInput.value,
				campos: ['id', 'nombre', 'provincia.nombre'],
				max: 10,
				orden: 'nombre',
				aplanar: true,
			};
			getCalles(params).then((e) => {
				const options = {
					jsonData: e.data,
					tituloTabla: 'tabla',
					ordenColumna: 1,
					ordenTipo: 'asc',
					ocultarColumnas: [],
					cantidadItems: 10,
				};
				divDescargar.style.display = '';
				descargarButton.href = e.url;
				ponchoTable(options);
			});
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

console.log('ver:0.1.0');
