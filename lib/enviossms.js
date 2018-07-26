'use strict';
/**
 * Class EnviosSms
 */
function EnviosSms() {
  console.log('Init EnviosSms');
};

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

EnviosSms.prototype.sendSimpleSms = function(cb) {
  return this.constructor.sendSimpleSms(this, cb);
};

module.exports = EnviosSms;
