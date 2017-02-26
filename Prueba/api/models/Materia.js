module.exports = {
  attributes: {
	  nombreMateria:{
          type:'string',
          required:true
      },
      topicoMateria:{
          type:'string',
          required:true
      },
      fechaCreacion:{
          type:'date',
          required:true
      },
	  grupos:{
		  collection:'Grupo',
		  via:'idMateria'
	  }
  }
};