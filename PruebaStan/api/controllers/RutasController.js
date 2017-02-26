module.exports = {
	home: function (req, res) {
		return res.view('vistas/home', {})

	},
	crearMateria: function (req, res) {

		return res.view('vistas/Materia/crearMateria')

	},
	
	listarMaterias:function(req,res){
		Materia.find()
			.exec(function (errorsitoIndefinido, materiasEncontradas) {
				if (errorsitoIndefinido) {
					return res.view('vistas/Error', {
						error: {
							descripcion: "Error al listar las materias",
							rawError: errorsitoIndefinido,
							url: "/ListarMaterias"
						}
					});
				}

				res.view('vistas/Materia/listarMaterias', {
					materias: materiasEncontradas
				})

			})
	},
	
	editarMateria: function(req,res){
	
		var parametros = req.allParams();

		if (parametros.id) {

			Materia.findOne({
				id: parametros.id
			}).exec(function (errorsito, MateriaEncontrada) {
				if (errorsito) {
					return res.view('vistas/Error', {
						error: {
							desripcion: "Error",
							rawError: errorsito,
							url: "/ListarMaterias"
						}
					});
				}
				if (MateriaEncontrada) {
					return res.view("vistas/Materia/editarMateria", {
						materiaAEditar: MateriaEncontrada,
						
					});
				} else {
					return res.view('vistas/Error', {
						error: {
							desripcion: "La materia con id: " + parametros.id + " no existe en la base de datos.",
							rawError: "No existe la materia",
							url: "/ListarMaterias"
						}
					});
				}
			})
		} else {

			return res.view('vistas/Error', {
				error: {
					desripcion: "Falta ID",
					rawError: "Faltan Parametros",
					url: "/ListarMaterias"
				}
			});

		}
	},
	crearGrupo: function (req, res) {

		return res.view('vistas/Grupo/crearGrupo')

	},
	
	listarGrupos:function(req,res){
		var parametros = req.allParams();
		Grupo.find({
				id: parametros.id
			})
			.exec(function (errorsitoIndefinido, gruposEncontrados) {

				if (errorsitoIndefinido) {
					return res.view('vistas/Error', {
						error: {
							descripcion: "Error al listar los grupos",
							rawError: errorsitoIndefinido,
							url: "/ListarGrupos"
						}
					});
				}

				res.view('vistas/Grupo/listarGrupos', {
					grupos: gruposEncontrados
				})
			})
	},
	
	editarGrupo: function (req,res){
		
	},
	
	error: function(req,res){
		return res.view('vistas/Error', {
			error: {
				descripcion: "Error de ruta, la ruta correcta es Inicio",
				rawError: "Ruta equivocada",
				url: "/Inicio"
			}
		})
	}
	
};