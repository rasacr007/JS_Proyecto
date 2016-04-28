
/* Objeto que contendra la estructura del registro*/
function objetoRegistro(par_name, par_lastName, par_email,par_phone,par_position) {

    this.name= par_name;
    this.lastName=par_lastName;
    this.email=par_email;
    this.phone=par_phone;
    this.position=par_position;

  Object.defineProperty(this, 'Position', {
    get: function() {
        return position;
    },
    set: function(value) {
      position = value;

    }
  });

  Object.defineProperty(this, 'Name', {
    get: function() {
        return name;
    },
    set: function(value) {
      name = value;
    }
  });

  Object.defineProperty(this, 'LastName', {
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
  Object.defineProperty(this, 'Phone', {
    get: function() {
        return phone;
    },
    set: function(value) {
      phone = value;
    }
  });
  Object.defineProperty(this, 'FullName', {
    get: function() {
        return this.name +' ' +this.lastName;
    }
  });

function devuelveStringJSON(arregloObjetos){
    var totalValores=''
    var valores=''
    arregloObjetos.forEach (function (objeto){
                  valores='{'
                  Object.getOwnPropertyNames(objeto).forEach(function(val, idx, array) {
                                                            valores+=val + ' : ' + objeto[val]+', ';
                                                          });
                  valores+= '}'
                  valores= valores.replace(', }','}')
                  totalValores+=valores;
    })
    totalValores = totalValores.replace('}{','},{');
    return totalValores;
  };

}
