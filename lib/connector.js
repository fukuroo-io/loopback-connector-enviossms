'use strict';
const debug = require('debug')('loopback:connector:enviossms');
const Client = require('node-rest-client').Client;
const EnviosSms = require('./enviossms');
const endpoints = require('./endpoints');

/**
 * Class EnviosSmsConnector
 */
class EnviosSmsConnector {
  /**
   * @param  {object} settings
   */
  constructor(settings) {
    if (typeof settings !== 'object') {
      let msg = 'Please provide a settings object for init this connector.';
      debug(msg + ' For more information visit this link: http://localhost');
      throw new Error(msg);
    }
    this._models = {};
    this.name = settings.name;
    this.settings = settings || {};
    this.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json;charset=utf-8',
    };
    this.rest = new Client({user: settings.username, password: settings.password});
    this.defineRestMethods(endpoints);
    console.log('EnviosSmsConnector created');
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
        console.log(j.name, `${b}${j.uri}`, j.verb);
        this.rest.registerMethod(j.name, `${b}${j.uri}`, j.verb);
      }
    }
    /* eslint-enable guard-for-in */
    console.log('Endpoints ready!');
  }
};

EnviosSms.initialize = (dataSource, callback) => {
  console.log('Init enviossms connector');
  dataSource.connector = new EnviosSmsConnector(dataSource.settings);
  dataSource.connector.dataSource = dataSource;
  if (callback) {
    process.nextTick(() => {
      callback && callback();
    });
  }
};

EnviosSmsConnector.prototype.DataAccessObject = EnviosSms;

module.exports = EnviosSmsConnector;
