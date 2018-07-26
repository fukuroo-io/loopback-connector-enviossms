'use strict';
/**
 * Class EnviosSms
 *
 * Definir aqui los metodos que contendra el modelo
 * que pertenezca al datasource que consuma este conector
 * connector.rest es el node rest client al que se agregaron los
 * metodos definidos en EnviosSms.js dentro del array api.
 * Cada metodo definido alli debe ser llamado de la siguiente forma
 * connector.rest.<methodName>
 * Los metodos que se agreguen deben retornar siempre una Promise.
 */
function EnviosSms() { // TODO (Diego) creo que con un obj literal funcionaria
  console.log('Init EnviosSms');
};

// Para poder acceder al metodo sin instanciar la clase
EnviosSms.sendSimpleSms = function(options) {
  return new Promise((resolve, reject) => {
    if (!options.to || !options.text) reject('"to" and "text" params are required');
    const connector = this.dataSource.connector;

    const args = {
      data: {
        'from': options.from || 'InfoSMS',
        'to': options.to,
        'text': options.text,
      },
      headers: connector.headers,
    };
    console.log(JSON.stringify(args));
    connector.rest.methods.single(args, (data, res) => {
      resolve([data, res]);
    }).on('requestTimeout', (req) => {
      req.abort();
      reject('Limit request timeout exced');
    }).on('responseTimeout', (res) => {
      reject('Limit response timeout exced');
    }).on('error', (err) => {
      reject(err);
    });
  });
};

// TODO (Diego) Verificar los argumentos, no creo que sean correctos en ambas
// TODO (Diego) verificar si es necesario anexar la misma funcion al prototype
EnviosSms.prototype.sendSimpleSms = function(cb) {
  return this.constructor.sendSimpleSms(this, cb);
};

module.exports = EnviosSms;
