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

const getDepartamentosByIdProvincia = async (idProv, opt) => {
	const max = opt?.max || 200;
	const campos = opt?.campos || ['id', 'nombre'];

	const resp = await fetch(
		`${URL_API}/departamentos?provincia=${idProv}&campos=${campos}&max=${max}&orden=nombre&aplanar=true`,
		headers ?? {}
	);
	const jsonData = await resp.json();

	return jsonData.departamentos;
};
// TODO: arreglar interseccion

// TODO: si se envia buenos aires [] buscar por id y no interseccion y bloquar select dep

const getMunicipiosByIdDepartamento = async (idDep, opt) => {
	const max = opt?.max || 300;

	const campos = opt?.campos || ['id', 'nombre'];
	const resp = await fetch(
		`${URL_API}/municipios?interseccion=departamento:${idDep}&campos=${campos}&orden=nombre&max=${max}&aplanar=true`,
		headers ?? {}
	);
	const jsonData = await resp.json();
	return jsonData.municipios;
};

//todo: localidad censales
const getLocalidades = async (idProv, idDep, idMun, opt) => {
	const max = opt?.max || 300;
	const campos = opt?.campos || ['id', 'nombre'];
	const resp = await fetch(
		`${URL_API}/localidades-censales?provincia=${idProv}&departamento=${idDep}&municipio=${idMun}&campos=${campos}&orden=nombre&max=${max}&aplanar=true`,
		headers ?? {}
	);
	const jsonData = await resp.json();
	return jsonData.localidades_censales;
};

const getCalles = async (idProv, idDep, idLoc, calle, opt) => {
	const max = opt?.max || 300;
	calle = calle ?? '""';
	console.log(calle);
	const campos = opt?.campos || ['id', 'nombre'];
	const resp = await fetch(
		`${URL_API}/calles?nombre=${calle}&provincia=${idProv}&departamento=${idDep}&localidad_censal=${idLoc}&aplanar=true&campos=${campos}&max=${max}`,
		headers ?? {}
	);
	const jsonData = await resp.json();
	return jsonData.calles;
};
