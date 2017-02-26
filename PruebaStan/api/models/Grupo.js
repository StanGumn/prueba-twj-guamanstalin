module.exports = {
  attributes: {
	  nombreGrupo:{
          type:'string',
          required:true
      },
      numeroMaximoEstudiante:{
          type:'integer',
          required:true
      },
	  idMateria:{
		  model:'Materia',
		  required:true
	  }
  }
};