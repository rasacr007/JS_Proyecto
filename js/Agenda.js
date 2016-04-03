
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

    function updateContact(pos,name, lastName, email,phone){
       var postmp = findPos(pos);
       if (postmp<0){
         throw new Error(message_recNotFound);
       };
       with (ContactsArray[postmp]) {
         name=name;
         lastName=lastName;
         email=email;
         phone=phone;
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
         addContacts("Randall","Sanabria","sanabria7@hotmail.com","506-8801-9698");
         addContacts("Juan","Perez","perez@hotmail.com","505-8801-9698");
         addContacts("Carlos","Mena","mena@hotmail.com","507-8801-9698");
         addContacts("Raul","Mora","mora@hotmail.com","508-8801-9698");
     }

  };
};
