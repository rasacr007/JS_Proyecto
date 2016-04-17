/*
Maneja el acceso a los datos
listar, guardar, extraer y borrar
*/


var accesoDatos= function () {

  return {
    listarTodosDatos : function(){
      /*  var window.localStorage.removeItem("Agenda_"+position);
        return true
        */
    },


    guardarDatos: function (position,name, lastName, email,phone) {
      if (!window.localStorage.getItem("Agenda")) {
        var registro=JSON.stringify({position: position, name:name,lastName:lastName, email:email, phone:phone});
        window.localStorage.setItem("Agenda_"+position,registro);
      }
    },
    editarDatos : function(position,name, lastName, email,phone){
      var registro=JSON.stringify({position: position, name:name,lastName:lastName, email:email, phone:phone});
      window.localStorage.setItem("Agenda_"+position,registro);

    },
    listarDatos: function (position){
        return JSON.parse(JSON.stringify(window.localStorage.getItem("Agenda_"+position)));
    },
    borrarDatos : function(position){
        window.localStorage.removeItem("Agenda_"+position);
        return true
    }
  }

}
