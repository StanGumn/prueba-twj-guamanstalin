module.exports = {
	crearMateria: function (req, res) {
		if (req.method == "POST") {
			var parametros = req.allParams();
			if (parametros.nombreMateria && parametros.topicoMateria && parametros.fechaCreacion) {
				var materiaCrear = {
					nombreMateria: parametros.nombreMateria,
					topicoMateria: parametros.topicoMateria,
					fechaCreacion: parametros.fechaCreacion
				}
				Materia.create(materiaCrear).exec(function (err, materiaCreada) {
					if (err) {
						return res.view('vistas/Error', {
							error: {
								desripcion: "Error creando nueva materia",
								rawError: err,
								url: "/CrearMateria"
							}
						});
					}
					Materia.find()
						.exec(function (errorsitoIndefinido, materiasEncontradas) {
							if (errorsitoIndefinido) {
								res.view('vistas/Error', {
									error: {
										desripcion: "Error al listar las materias",
										rawError: errorsitoIndefinido,
										url: "/ListarMaterias"
									}
								});
							}
							res.view('vistas/Materia/listarMaterias', {
								materias: materiasEncontradas
							});
						})
				})
            } else {
				return res.view('vistas/Error', {
					error: {
						desripcion: "Llena todos el siguiente campo para la materia",
						rawError: "Fallo en envio",
						url: "/CrearMateria"
					}
				});
			}
		} else {
			return res.view('vistas/Error', {
				error: {
					desripcion: "Error Metodo HTTP",
					rawError: "HTTP Invalido",
					url: "/CrearMateria"
				}
			});

		}
	},
	
	BorrarMateria: function (req, res) {
		var parametros = req.allParams();
		if (parametros.id) {
			Materia.destroy({
				id: parametros.id
			}).exec(function (errorsito, MateriaRemovida) {
				if (errorsito) {
					return res.view('vistas/Error', {
						error: {
							desripcion: "Error",
							rawError: errorsito,
							url: "/ListarMaterias"
						}
					});
				}
				Materia.find()
					.exec(function (errorsitoIndefinido, materiasEncontradas) {

						if (errorsitoIndefinido) {
							res.view('vistas/Error', {
								error: {
									desripcion: "Error al listar las materias",
									rawError: errorsitoIndefinido,
									url: "/ListarMaterias"
								}
							});
						}

						res.view('vistas/Materia/ListarMaterias', {
							materias: materiasEncontradas
						});
					})
			})

		} else {
			return res.view('vistas/Error', {
				error: {
					desripcion: "Falta ID para borrar la Materia",
					rawError: "No envia ID",
					url: "/ListarMaterias"
				}
			});
		}
	},
	
	editarMateria: function (req, res) {

        var parametros = req.allParams();

        if (parametros.idMateria && (parametros.nombreMateria || parametros.topicoMateria || parametros.fechaCreacion)) {
            
            var materiaAEditar = {
                nombreMateria: parametros.nombreMateria,
                topicoMateria: parametros.topicoMateria,
                fechaCreacion: parametros.fechaCreacion
            }

            if (materiaAEditar.nombreMateria == "") {
                delete materiaAEditar.nombreMateria
            }
            if (materiaAEditar.topicoMateria == "") {
                delete materiaAEditar.topicoMateria
            }
            if (materiaAEditar.fechaCreacion == "") {
                delete materiaAEditar.fechaCreacion
            }
        
            Materia.update({
                    id: parametros.idMateria
                }, materiaAEditar)
                .exec(function (errorsito, MateriaRemovida) {
                    if (errorsito) {
                        return res.view('vistas/Error', {
                            error: {
                                desripcion: "Error",
                                rawError: errorsito,
                                url: "/ListarMaterias"
                            }
                        });
                    }
                
                    Materia.find()
                        .exec(function (errorsitoIndefinido, materiasEncontradas) {

                            if (errorsitoIndefinido) {
                                res.view('vistas/Error', {
                                    error: {
                                        desripcion: "Error al listar las Materias",
                                        rawError: errorsitoIndefinido,
                                        url: "/ListarMaterias"
                                    }
                                });
                            }

                            res.view('vistas/Materia/ListarMaterias', {
                                materias: materiasEncontradas
                            });
                        })

                })
            
            
            
            
            

        } else {
            return res.view('vistas/Error', {
                error: {
                    desripcion: "Falta enviar el ID, el nombre, topico o fecha de creacion de la materia",
                    rawError: "No envia Parametros",
                    url: "/ListarMaterias"
                }
            });
        }



    }
};