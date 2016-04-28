/*
Maneja el acceso a los datos
listar, guardar, extraer y borrar
*/
/*
if (storageAvailable('localStorage')) {
	// Yippee! We can use localStorage awesomeness
}
else {
	// Too bad, no localStorage for us
}
*/
var accesoDatos= function () {

  return {
    listarTodosDatos : function(){
      var registros_storage =JSON.parse((window.localStorage.getItem("Agenda")));
      return   registros_storage;

    },


    guardarDatos: function (objeto) {

        //var registro=JSON.stringify({position: position, name:name,lastName:lastName, email:email, phone:phone});
        //window.localStorage.setItem("Agenda",registro);
        window.localStorage.setItem("Agenda",JSON.stringify(objeto));



    }
  }

}
