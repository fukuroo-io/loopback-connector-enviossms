'use strict';

/**
 * Agregar aqui los enpoints de api.enviossms.com
 * Mantener el anidamiento segun la version de la api
 * Anidar segun el tipo a usar ej: sms, email, voz
 * api simpre debe ser un array de objects
 * los objects deben contener name (nombre que tendra el metodo al llamarlo)
 * uri (parte final del endpoint) y verb (verbo http a utilizar)
 */
module.exports = {
  baseUrl: 'http://api.enviossms.com',
  v1: {
    sms: {
      path: '/sms/1',
      api: [
        {name: 'single', uri: '/text/single', verb: 'POST'},
        {name: 'advanced', uri: '/text/advanced', verb: 'POST'},
        {name: 'binary', uri: '/binary/advanced', verb: 'POST'},
        {name: 'reports', uri: '/reports', verb: 'GET'},
        {name: 'logs', uri: '/logs', verb: 'GET'},
      ],
    },
  },
};
