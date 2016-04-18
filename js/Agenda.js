

var Agenda = function() {
    var ContactsArray =[];
    var message_recNotFound ='Registro no encontrado'


    function addContacts(name, lastName, email,phone){
        var pos= findMaxPosition();
        ContactsArray.push({position: pos, name:name,lastName:lastName, email:email, phone:phone});
        var acceso = new accesoDatos();
        acceso.guardarDatos(ContactsArray);

    };

  /* Devuelve el maximo registro ingresado */
  function findMaxPosition(){
      var  result=-1;
      var maxlenght=ContactsArray.length();
      result= 1+(maxlength ===0 ? -1 : ContactsArray[maxlength-1].position);
      return result;
    };

    /* Ubica la posicion dentro del arreglo correspondiente al registro deseado, sino encuentra devuelve -1 */
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
       var acceso = new accesoDatos();
       acceso.guardarDatos(ContactsArray);

    };

    function deleteContact(pos){
      var postmp = findPos(pos);
      if (postmp<0){
        throw new Error(message_recNotFound);
      };
      ContactsArray.splice(postmp,1);
      var acceso = new accesoDatos();
      acceso.guardarDatos(ContactsArray);
     };

    function listContacts(){
      var acceso = new accesoDatos();
      var regs=acceso.listarTodosDatos();
      regs.forEach(function(item){
        ContactsArray.push(item);
      });
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
