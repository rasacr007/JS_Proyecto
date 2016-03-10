
var Agenda = function() {
    var ContactsArray =[];

    function addContacts(name, lastName, email,phone){
        ContactsArray.push({Name:name,LastName:lastName, Email:email, Phone:phone});
    };

    function updateContact(name, lastName, email,phone){
       var pos = ContactsArray.indexOf(name);
          ContactsArray[pos].Name=name;
         ContactsArray[pos].LastName=lastName;
         ContactsArray[pos].Email=email;
         ContactsArray[pos].Phone=phone;
       };


    /*   with (ContactsArray[pos]) {
         Name=name;
         LastName=lastName;
         Email=email;
         Phone=phone;
       };*/
    };

    function deleteContact(name){
      var pos = ContactsArray.indexOf(name);
      ContactsArray.splice(pos,1);
     };

    function listContacts(){
      return ContactsArray;
      /*ContactsArray.forEach(function(reg, indice, Arreglo){
        console.log(reg.Name);
      }
    );*/
    };


  return {
    listarContactos : function (){
    return listContacts();
    },
    crearContacto: function (name, lastName, email,phone){
      addContacts(name,lastName, email,phone);
    },
     editarContacto(name,lastName, email,phone){
       updateContact(name,lastName, email,phone);
     },
     borrarContacto(name){
       deleteContact(name);
     }
  };
};
