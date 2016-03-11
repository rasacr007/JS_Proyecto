console.log('Hello everyone!');

var Agenda = function() {
    var ContactsArray =[];
    var message_recNotFound ='Registro no encontrado'

    function addContacts(name, lastName, email,phone){
        var pos= findMaxPosition();
        ContactsArray.push({Position: pos, Name:name,LastName:lastName, Email:email, Phone:phone});
    };

    function findMaxPosition(){
      var  result=0;
      ContactsArray.forEach(function(item,i,arrayobj){
          if (item.Position>result){
            result = item.Position;
          };
      });
        return result;
    };
    function findPos (pos){
      var  result=-1
      ContactsArray.forEach(function(item,i,arrayobj){
          if (item.Position==pos){
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
         Name=name;
         LastName=lastName;
         Email=email;
         Phone=phone;
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
     }
  };
};



