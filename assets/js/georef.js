const URL_API = 'https://apis.datos.gob.ar/georef/api';
const token = TOKEN;
const headers = {
	headers: {
		authorization: 'Bearer ' + token,
	},
};

const getProvincias = (opt) => {
	const max = opt?.max;

	const provincias = [
		{
			id: '06',
			nombre: 'Buenos Aires',
		},
		{
			id: '10',
			nombre: 'Catamarca',
		},
		{
			id: '22',
			nombre: 'Chaco',
		},
		{
			id: '26',
			nombre: 'Chubut',
		},
		{
			id: '02',
			nombre: 'Ciudad Autónoma de Buenos Aires',
		},
		{
			id: '14',
			nombre: 'Córdoba',
		},
		{
			id: '18',
			nombre: 'Corrientes',
		},
		{
			id: '30',
			nombre: 'Entre Ríos',
		},
		{
			id: '34',
			nombre: 'Formosa',
		},
		{
			id: '38',
			nombre: 'Jujuy',
		},
		{
			id: '42',
			nombre: 'La Pampa',
		},
		{
			id: '46',
			nombre: 'La Rioja',
		},
		{
			id: '50',
			nombre: 'Mendoza',
		},
		{
			id: '54',
			nombre: 'Misiones',
		},
		{
			id: '58',
			nombre: 'Neuquén',
		},
		{
			id: '62',
			nombre: 'Río Negro',
		},
		{
			id: '66',
			nombre: 'Salta',
		},
		{
			id: '70',
			nombre: 'San Juan',
		},
		{
			id: '74',
			nombre: 'San Luis',
		},
		{
			id: '78',
			nombre: 'Santa Cruz',
		},
		{
			id: '82',
			nombre: 'Santa Fe',
		},
		{
			id: '86',
			nombre: 'Santiago del Estero',
		},
		{
			id: '94',
			nombre: 'Tierra del Fuego, Antártida e Islas del Atlántico Sur',
		},
		{
			id: '90',
			nombre: 'Tucumán',
		},
	];

	return provincias.slice(0, max ?? provincias.length);
};

const getDepartamentosByIdProvincia = async (params) => {
	params = clearEmptyKeys(params);
	const p = new URLSearchParams(params);
	const resp = await fetch(
		`${URL_API}/departamentos?${p.toString()}`,
		headers ?? {}
	);
	const jsonData = await resp.json();

	return { url: resp.url, data: jsonData.departamentos };
};
// TODO: arreglar interseccion

// TODO: si se envia buenos aires [] buscar por id y no interseccion y bloquar select dep

const getMunicipiosByIdDepartamento = async (params) => {
	params = clearEmptyKeys(params);
	idDepartamento = params.IdDep;
	console.log(idDepartamento);
	delete params['IdDep'];
	const p = new URLSearchParams(params);
	const resp = await fetch(
		`${URL_API}/municipios?${p.toString()}`,
		headers ?? {}
	);
	const jsonData = await resp.json();
	if (Number(idDepartamento)) {
		console.log('entroooo');
		const filteredMunicipios = jsonData.municipios.filter(
			(municipio) => municipio.id.slice(-3) === idDepartamento
		);
		console.log(idDepartamento);
		console.log(filteredMunicipios);
		return { url: resp.url, data: filteredMunicipios };
	}

	return { url: resp.url, data: jsonData.municipios };
};

const getLocalidades = async (params) => {
	params = clearEmptyKeys(params);
	const p = new URLSearchParams(params);

	const resp = await fetch(
		`${URL_API}/localidades-censales?${p}`,
		headers ?? {}
	);
	const jsonData = await resp.json();
	return { url: resp.url, data: jsonData.localidades_censales };
};

const getCalles = async (params) => {
	params = clearEmptyKeys(params);
	const p = new URLSearchParams(params);
	const resp = await fetch(`${URL_API}/calles?${p}`, headers ?? {});
	const jsonData = await resp.json();
	return { url: resp.url, data: jsonData.calles };
};

const clearEmptyKeys = (params) => {
	for (var key in params) {
		if (params[key] === 'completo' || params[key] === '') {
			delete params[key];
		}
	}
	return params;
};
