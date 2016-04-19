
function crearObjetoRegistroAgenda(par_name, par_lastName, par_email,par_phone,par_position){
    this.name= par_name;
    this.lastName=par_lastName;
    this.email=par_email;
    this.phone=par_phone;
    this.position=par_position;
};

function objetoRegistro() {
  var name = null;
  var lastName = null;
  var email = null;
  var phone = null;
  var position=null;
  var registro = [];

  Object.defineProperty(this, 'Posicion', {
    get: function() {
        return position;
    },
    set: function(value) {
      position = value;

    }
  });

  Object.defineProperty(this, 'Nombre', {
    get: function() {
        return name;
    },
    set: function(value) {
      name = value;
    }
  });

  Object.defineProperty(this, 'Apellido', {
    get: function() {
        return lastName;
    },
    set: function(value) {
      lastName = value;
    }
  });

  Object.defineProperty(this, 'Email', {
    get: function() {
        return email;
    },
    set: function(value) {
      email = value;
    }
  });
  Object.defineProperty(this, 'Telefono', {
    get: function() {
        return phone;
    },
    set: function(value) {
      phone = value;
    }
  });

}
