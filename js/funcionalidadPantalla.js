
//Maneja todo el manejo de los elementos del DOM


var objAgenda= new Agenda();
//Actualiza los registro en el almacenamiento establecido
function guardarRegistro(evento){
  try {
       evento.preventDefault();
         var accionPantalla=parseInt(getParameterByName("accion",  window.location.href));

         if (salvarCambios(DevuelveMostrarConfirm(accionPantalla))=== false){
             return false;
         };

         if (accionPantalla ===1){
           var objreg= new objetoRegistro(
                         document.querySelector("#nombre").value,
                         document.querySelector("#apellido").value,
                         document.querySelector("#email").value,
                         document.querySelector("#telefono").value)
            objAgenda.crearContacto(objreg);
         }
         else if (accionPantalla ===2){
           var objreg= new objetoRegistro(
                         document.querySelector("#nombre").value,
                         document.querySelector("#apellido").value,
                         document.querySelector("#email").value,
                         document.querySelector("#telefono").value,
                         getParameterByName("position",  window.location.href))

           objAgenda.editarContacto(objreg);
         }
         else if (accionPantalla ===3){
           var objreg= new objetoRegistro();
           objreg.position=getParameterByName("position",  window.location.href);
           objAgenda.borrarContacto(objreg);
         };
        volverPagina();
        return 1;

   } catch (e) {
     mostrarMensajeError(e);
   }
};

//Muestra el error producido durante la corrida
function mostrarMensajeError(objetoError){
  document.querySelector("#mensajeError").innerHTML= "Error: " + objetoError.message  + "!!!!";
};


//Carga la pantalla con todos los Contactos
function cargarPantallaListar() {


      var Registros=[];
      var y='';
      // var x ="<thead><tr><th class=col-xs-2 data-sortable=true>Nombre</th>"+
      //         "<th class=col-xs-2>Telefono</th>"+
      //         "<th class=col-xs-2>Email</th>"+
      //       //  "<th class=col-xs-2>.</th>"+
      //       //"<th class=col-xs-2>.</th>"+
      //         "</tr></thead>"
        var x ="<thead><tr><th class=col-xs-2 data-sortable=true>Nombre</th><th class=col-xs-2>Apellido</th><th class=col-xs-2>Telefono</th><th class=col-xs-2>Email</th><th class=col-xs-2></th><th class=col-xs-2></th></tr></thead>"
      x+="<tbody>";
      try {

            //Trae todos los Contactos
            Registros= objAgenda.listarContactos();
             Registros.forEach( function (item){
                   y+="<tr>" +
                        "<td class=col-xs-2>"+item.name+"</td>"+
                        "<td class=col-xs-2>"+item.lastName+"</td>"+
                        "<td class=col-xs-2>"+item.phone+"</td>"+
                        "<td class=col-xs-2>"+item.email+"</td>"+
                        "<td class=col-xs-2>"+"<a href=Edit.html?accion=2&position=" + item.position+">"
                        +"<img src=imgs/edit.ico alt=Editar title=Editar>"+"</a></td>"+
                        "<td class=col-xs-2>"+"<a href=Edit.html?accion=3&position=" + item.position+">"
                        +"<img src=imgs/delete.ico alt=Borrar title=Borrar>"+"</a></td>"+
                  "</tr>";

            });
            x=x+y;
            x+="</tbody>";
            document.querySelector("table").innerHTML = x;
            document.querySelector("#nuevoContacto").addEventListener("click",function () {
                                              window.open("Edit.html?accion=1","_self")});

    } catch (e) {
      mostrarMensajeError(e);
    }
};

//Carga la pantalla con los datos a modificar o eliminar
function cargarPantallaEditar(evento){
    var tituloPantalla;
    try {

        Registros= objAgenda.listarContactos();
        document.querySelector('#cancelar').addEventListener('click', volverPagina);
        document.querySelector('#forma').addEventListener('submit', function(evento){
          guardarRegistro(evento);
        } );

        accionPantalla=parseInt(getParameterByName("accion",  window.location.href));
        if (accionPantalla!==1){
          cargarRegistros();
        };
         switch (accionPantalla){
                                case 1:
                                  tituloPantalla='Crear Contacto';
                                        break;
                                case 2:
                                tituloPantalla= 'Editar Contacto';
                                        break;
                                default :
                                  tituloPantalla='Borrar Contacto';
                                  $('form input').prop('disabled', true);
                                  break;
                                };

      document.querySelector('h1').innerHTML=tituloPantalla;
    } catch (e) {
            mostrarMensajeError(e);
    }
};

//Vuelve a la pantalla anterior
function volverPagina(){
    javascript:history.back(-1);
};

//Carga a los campos de la pantalla los valores retornados
function cargarRegistros(){
  var param = getParameterByName("position",  window.location.href);
  var objRegistro = new objetoRegistro();
  objRegistro.position=param;
  var obj= objAgenda.listarContacto(objRegistro);
      document.querySelector("#nombre").value=obj.name;
      document.querySelector("#apellido").value=obj.lastName;
      document.querySelector("#email").value=obj.email;
      document.querySelector("#telefono").value=obj.phone;
 };

function  DevuelveMostrarConfirm(tipoAccion) {
  var resp;
  if (tipoAccion===1){
    resp= "Desea crear contacto";
  }
  else if (tipoAccion===2) {
            resp="Desea modificar contacto";
          }
      else {
            resp= "Desea eliminar contacto";
          }
    return resp;
};

//Devuelve el valor del stringquey
 function getParameterByName(name, url) {
     if (!url) url = window.location.href;
     name = name.replace(/[\[\]]/g, "\\$&");
     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
         results = regex.exec(url);
     if (!results) return null;
     if (!results[2]) return '';
     return decodeURIComponent(results[2].replace(/\+/g, " "));
 };

//Solicita confirmacion si se desea aceptar la accion
 function salvarCambios(mensaje) {
    var respuesta;
    if (confirm(mensaje) === true) {
        respuesta = true;
    } else {
        respuesta = false;
    };
    return respuesta;
};
