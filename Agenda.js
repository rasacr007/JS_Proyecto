var Agenda = function() {
    var ContactsArray =[];

  return {
    listContacts : function (){
      /*ContactsArray.forEach(function(reg, indice, Arreglo){
        console.log(reg.Name);
      }
    );*/
    return ContactsArray;

    },
    addContacts : function (name, lastName, email,phone){
      ContactsArray.push({Name:name,LastName:lastName, Email:email, Phone:phone});
     }
  };
};