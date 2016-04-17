
var objAgenda= new Agenda();

function cargarPantallaListar()
{
      var Registros=[];
      var x ="<thead><tr><th>Nombre</th><th>Apellido</th><th>Telefono</th><th>Email</th><th></th><th></th></tr></thead>"
      x+="<tbody>";
      //var regAgenda = new Agenda();
      objAgenda.cargarDatosPrueba();
      Registros= objAgenda.listarContactos();
       Registros.forEach( function (item){
            x+="<tr>" +
            "<td>"+item.name+"</td>"+
            "<td>"+item.lastName+"</td>"+
            "<td>"+item.phone+"</td>"+
            "<td>"+item.email+"</td>"+
            "<td>"+"<a href=edit.html?accion=2&position=" + item.position+">"
            +"<img src=imgs/edit-24.ico alt=Editar title=Editar>"+"</a></td>"+
            "<td>"+
            "<a href=edit.html?accion=3&position=" + item.position+">"
            +"<img src=imgs/delete-24.ico alt=Borrar title=Borrar>"+"</a></td>"+
            "</tr>";
      });
      x+="</tbody>";
      document.querySelector("table").innerHTML = x;
      document.querySelector("#nuevoContacto").addEventListener("click",function () {
      window.open("edit.html?accion=1","_self");
      })


}

function cargarPantallaEditar(){

    var tituloPantalla
    var tituloPantalla
    objAgenda.cargarDatosPrueba()
    document.querySelector('#cancelar').addEventListener('click', volverPagina);
    document.querySelector('#guardar').addEventListener('click', guardar);
    accionPantalla=parseInt(getParameterByName("accion",  window.location.href));
    if (accionPantalla!==1){
      cargarDatos();
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
                              break;
                            };

  document.querySelector('h1').innerHTML=tituloPantalla;
};

function volverPagina(){
    javascript:history.back(-1);
};

function cargarDatos(){

  var param = getParameterByName("position",  window.location.href);
  //var objAgenda = new Agenda();
  var obj= objAgenda.listarContacto(param);
      document.querySelector("#nombre").value=obj.name;
      document.querySelector("#apellido").value=obj.lastName;
      document.querySelector("#email").value=obj.email;
      document.querySelector("#telefono").value=obj.phone;
 };

 function guardar(){
   var accionPantalla=parseInt(getParameterByName("accion",  window.location.href));
   //var objAgenda = new Agenda();

   if (accionPantalla ===1){
      objAgenda.crearContacto(document.querySelector("#nombre").value,
      document.querySelector("#apellido").value,
      document.querySelector("#email").value,
      document.querySelector("#telefono").value);
   }
   else if (accionPantalla ===2){
     objAgenda.editarContacto(
     getParameterByName("position",  window.location.href),
     document.querySelector("#nombre").value,
     document.querySelector("#apellido").value,
     document.querySelector("#email").value,
     document.querySelector("#telefono").value);
   }
   else {
     objAgenda.borrarContacto(
     getParameterByName("position",  window.location.href))
   }
}

 function getParameterByName(name, url) {
     if (!url) url = window.location.href;
     name = name.replace(/[\[\]]/g, "\\$&");
     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
         results = regex.exec(url);
     if (!results) return null;
     if (!results[2]) return '';
     return decodeURIComponent(results[2].replace(/\+/g, " "));
 }
