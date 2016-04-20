
var objAgenda= new Agenda();

function cargarPantallaListar()
{
      var Registros=[];
      var x ="<thead><tr><th>Nombre</th><th>Apellido</th><th>Telefono</th><th>Email</th><th></th><th></th></tr></thead>"
      x+="<tbody>";
      //var regAgenda = new Agenda();
      //objAgenda.cargarDatosPrueba();
      Registros= objAgenda.listarContactos();
       Registros.forEach( function (item){
            x+="<tr>" +
            "<td>"+item.name+"</td>"+
            "<td>"+item.lastName+"</td>"+
            "<td>"+item.phone+"</td>"+
            "<td>"+item.email+"</td>"+
            "<td>"+"<a href=edit.html?accion=2&position=" + item.position+">"
            +"<img src=imgs/black_edit_24.ico alt=Editar title=Editar>"+"</a></td>"+
            "<td>"+
            "<a href=edit.html?accion=3&position=" + item.position+">"
            +"<img src=imgs/black_delete_24.ico alt=Borrar title=Borrar>"+"</a></td>"+
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
    Registros= objAgenda.listarContactos();
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
                              $('form input').prop('disabled', true);
                            //  $('form input[type="email"]').prop('disabled', true);
                            //  $('form input[type="tel"]').prop('disabled', true);
                              break;
                            };

  document.querySelector('h1').innerHTML=tituloPantalla;
};

function volverPagina(){
    javascript:history.back(-1);
};

function cargarDatos(){

  var param = getParameterByName("position",  window.location.href);
  var objRegistro = new objetoRegistro();
  objRegistro.position=param;
  var obj= objAgenda.listarContacto(objRegistro);
      document.querySelector("#nombre").value=obj.name;
      document.querySelector("#apellido").value=obj.lastName;
      document.querySelector("#email").value=obj.email;
      document.querySelector("#telefono").value=obj.phone;
 };

 function guardar(){

   if (salvarCambios()=== false){
     volverPagina();
     return;
   }

   var accionPantalla=parseInt(getParameterByName("accion",  window.location.href));
   //var objAgenda = new Agenda();


/*
     objetoRegistro();
   objreg.Nombre=document.querySelector("#nombre").value;
   objreg.Apellido=document.querySelector("#apellido").value;
   objreg.Telefono=document.querySelector("#telefono").value;
   objreg.Email=document.querySelector("#email").value;*/
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
     //objreg[fieldPosition]=getParameterByName("position",  window.location.href);
     objAgenda.editarContacto(objreg);
     /*
     getParameterByName("position",  window.location.href),
     document.querySelector("#nombre").value,
     document.querySelector("#apellido").value,
     document.querySelector("#email").value,
     document.querySelector("#telefono").value);
     */
   }
   else {
     var objreg= new objetoRegistro();
     objreg.position=getParameterByName("position",  window.location.href);
      /*             document.querySelector("#nombre").value,
                   document.querySelector("#apellido").value,
                   document.querySelector("#email").value,
                   document.querySelector("#telefono").value,
                 )*/
      //objreg[fieldPosition]=getParameterByName("position",  window.location.href);
     objAgenda.borrarContacto(objreg)
   }

   volverPagina();
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

 function salvarCambios() {
    var respuesta;
    if (confirm("Desea salvar los cambios ?") == true) {
        respuesta = true;
    } else {
        respuesta = false;
    }
    return respuesta;
}
