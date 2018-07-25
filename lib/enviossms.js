'use strict';
const debug = require('debug')('loopback:connector:enviossms');
const Client = require('node-rest-client').Client;
const endpoints = require('./endpoints');

module.exports = class EnviosSms {
  /**
   * @param  {object} settings
   */
  constructor(settings) {
    if (typeof settings !== 'object') {
      let msg = 'Please provide a settings object for init this connector.';
      debug(msg + ' For more information visit this link: http://localhost');
      throw new Error(msg);
    }
    this.settings = settings;
    this.headers = {
      'Content-Type': 'application/json',
      'accepts': 'applications/json',
    };
    this.rest = new Client({user: settings.username, password: settings.password});
    this.defineRestMethods(endpoints);
    debug('EnviosSms instance was created');
  }

  /**
   * @param  {object} endpoints
   */
  defineRestMethods(endpoints) {
    if (!endpoints) {
      debug('Endpoint is undefined');
      return;
    };
    /* eslint-disable guard-for-in */
    for (let i in endpoints.v1) {
      let b = `${endpoints.baseUrl}${endpoints.v1[i].path}`;
      for (let j of endpoints.v1[i].api) {
        this.rest.registerMethod(j.name, `${b}${j.uri}`, j.verb);
      }
    }
    debug('Endpoints ready!');
    /* eslint-enable guard-for-in */
  }

    /**
   * @param  {String} to @required
   * @param  {String} text @required
   * @param  {String} from @default "InfoSMS"
   * @return {Promise}
   */
  sendSimpleSms(to, text, from = 'InfoSMS') {
    return new Promise((resolve, reject) => {
      if (!to || !text) reject('"to" and "text" params are required');
      const args = {
        data: {
          from: from,
          to: to,
          text: text,
        },
        headers: this.headers,
      };
      this.rest.methods.single(args, (data, res) => {
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
};
