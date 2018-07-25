'use strict';
const debug = require('debug')('loopback:connector:enviossms');
const Client = require('node-rest-client').Client;
const DataAccessObject = require('./data-access-object');
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
    this.DataAccessObject = new DataAccessObject();
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
};
