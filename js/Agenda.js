

var Agenda = function() {
    var ContactsArray =[];
    var message_recNotFound ='Registro no encontrado'


    function addContacts(name, lastName, email,phone){
        var pos= findMaxPosition();
        ContactsArray.push({position: pos, name:name,lastName:lastName, email:email, phone:phone});
    };

    function findMaxPosition(){
      var  result=-1;
      ContactsArray.forEach(function(item,i,arrayobj){
            result = item.position;
      });
        return result+1;
    };
    function findPos (pos){
      var  result=-1
      ContactsArray.forEach(function(item,i,arrayobj){
          if (item.position==pos){
            result = i;
          };
      });
        return result;
    };

    function updateContact(par_pos,par_name, par_lastName,par_email,par_phone){
       var postmp = findPos(par_pos);
       if (postmp<0){
         throw new Error(message_recNotFound);
       };
       with (ContactsArray[postmp]) {
         name=par_name;
         lastName=par_lastName;
         email=par_email;
         phone=par_phone;
       };

    };

    function deleteContact(pos){
      var postmp = findPos(pos);
      if (postmp<0){
        throw new Error(message_recNotFound);
      };
      ContactsArray.splice(postmp,1);
     };

    function listContacts(){
      return ContactsArray;
    };
    function listContact(pos){
      var postmp = findPos(pos);
      if (postmp<0){
        throw new Error(message_recNotFound);
      };
      return ContactsArray[postmp];
     };

  return {
    listarContactos : function (){
        return listContacts();
    },
    listarContacto : function (position){
        return listContact(position);
    },
    crearContacto: function (name, lastName, email,phone){
        addContacts(name,lastName, email,phone);
    },

     editarContacto(position, name,lastName, email,phone){
        updateContact(position,name, lastName, email,phone);
     },

     borrarContacto(position){
        deleteContact(position);
     },
     cargarDatosPrueba(){

           addContacts("Randall","Sanabria","sanabria7@hotmail.com","8801-9698");
           addContacts("Juan","Perez","perez@hotmail.com","8801-9698");
           addContacts("Carlos","Mena","mena@hotmail.com","8801-9698");
           addContacts("Raul","Mora","mora@hotmail.com","8801-9698");


     }



  };
};

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
            "<td>"+"<a href=Edit.html?accion=2&position=" + item.position+">"
            +"<img src=imgs/edit-24.ico alt=Editar title=Editar>"+"</a></td>"+
            "<td>"+
            "<a href=Edit.html?accion=3&position=" + item.position+">"
            +"<img src=imgs/delete-24.ico alt=Borrar title=Borrar>"+"</a></td>"+
            "</tr>";
      });
      x+="</tbody>";
      document.querySelector("table").innerHTML = x;
      document.querySelector("#nuevoContacto").addEventListener("click",function () {
      window.open("Edit.html?accion=1");
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
