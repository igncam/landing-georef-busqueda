const URL_API = 'https://apis.datos.gob.ar/georef/api';

// obtiene provincias con id y nombre
const getProvincias = () => {
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

	return provincias;
};

const getDepartamentosByIdProvincia = async (idProv) => {
	const resp = await fetch(
		`${URL_API}/departamentos?provincia=${idProv}&campos=id,nombre&max=200&orden=nombre`
	);
	const jsonData = await resp.json();

	return jsonData.departamentos;
};

const getMunicipiosByIdProvincia = async (idProv) => {
	const resp = await fetch(
		`${URL_API}/municipios?provincia=${idProv}&campos=id,nombre&orden=nombre&max=200`
	);
	const jsonData = await resp.json();
	return jsonData.municipios;
};

// TODO: asentamientos - si consulta calles tiene que ir a localidades censales
const getLocalidades = async (idProv, idDep, idMun) => {
	const resp = await fetch(
		`${URL_API}/localidades?provincia=${idProv}&departamento=${idDep}&municipio=${idMun}&campos=id,nombre&orden=nombre&max=200`
	);
	const jsonData = await resp.json();
	return jsonData.localidades;
};
