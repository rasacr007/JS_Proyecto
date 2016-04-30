

var Agenda = function() {
    var ContactsArray =[];
    var message_recNotFound ='Registro no encontrado';
     var fieldPosition='position';
    //fieldName='name',
    //     fieldLastName='lastName',
    //     fieldPhone='phone',
    //     fieldEmail='email',


/*Agregar el onjregistro al array y lo guarda al localstorge*/
 function addContacts(objRegistro){
        var pos= findMaxPosition();
        objRegistro.position=pos;
        ContactsArray.push(objRegistro);
        var acceso = new accesoDatos();
        acceso.guardarDatos(ContactsArray);

    };

  /* Devuelve el maximo registro ingresado */
  function findMaxPosition(){
      var  result=-1;
      var maxlength=ContactsArray.length;
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

    /*Actualiza el registro en el array y Actualiza el localstorge*/
    function updateContact(objRegistro){
       var postmp = findPos(objRegistro.position)
       if (postmp<0){
         throw new Error(message_recNotFound);
       };
       with (ContactsArray[postmp]) {
         ContactsArray[postmp].name=objRegistro.name;
         ContactsArray[postmp].lastName=objRegistro.lastName;
         ContactsArray[postmp].email=objRegistro.email;
         ContactsArray[postmp].phone=objRegistro.phone;
       };
       var acceso = new accesoDatos();
       acceso.guardarDatos(ContactsArray);

    };

    /*borra el registro del array y Actualiza el localstorge*/
    function deleteContact(registroObjeto){
      var postmp = findPos(registroObjeto[fieldPosition]);
      if (postmp<0){
        throw new Error(message_recNotFound);
      };
      ContactsArray.splice(postmp,1);
      var acceso = new accesoDatos();
      acceso.guardarDatos(ContactsArray);
     };

    /*lista todos los contactos*/
    function listContacts(){
      var acceso = new accesoDatos();
      var regs=acceso.listarTodosDatos();
      if (regs != null) {
              regs.forEach(function(item){
                var objReg = new objetoRegistro(item.name,item.lastName,item.email,item.phone,item.position)
                ContactsArray.push(objReg);
              });
      };
            return ContactsArray;
    };

    /*Lista registro por el indice*/
    function listContact(registroObjeto){
      var postmp = findPos(registroObjeto[fieldPosition]);
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
       crearContacto: function (registroObjeto){
        addContacts(registroObjeto);
    },

     editarContacto(registroObjeto){
        updateContact(registroObjeto);
     },

     borrarContacto(registroObjeto){
        deleteContact(registroObjeto);
     },
     cargarDatosPrueba(){
           addContacts("Randall","Sanabria","sanabria7@hotmail.com","8801-9698");
           addContacts("Juan","Perez","perez@hotmail.com","8801-9698");
           addContacts("Carlos","Mena","mena@hotmail.com","8801-9698");
           addContacts("Raul","Mora","mora@hotmail.com","8801-9698");
     }
  };
};
