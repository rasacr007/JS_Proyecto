/*
Maneja el acceso a los datos
*/
var accesoDatos= function () {

  return {
    /*Devuelve los datos del storage*/
    listarTodosDatos : function(){
      var registros_storage =JSON.parse((window.localStorage.getItem("Agenda")));
      return   registros_storage;

    },

    /*guardar los datos al localStorage*/
    guardarDatos: function (objeto) {
        window.localStorage.setItem("Agenda",JSON.stringify(objeto));
    }
  }

}
