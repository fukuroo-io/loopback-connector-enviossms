'use strict';
const debug = require('debug')('loopback:connector:enviossms');
const EnviosSms = require('./enviossms');
const implementRestMethods = require('./implement-rest-methods');

/**
 * @param  {DataSource} dataSource
 * @param  {Function} callback
 */
module.exports = (dataSource, callback) => {
  debug('Init enviossms connector');
  dataSource.connector = new EnviosSms(dataSource.settings);
  dataSource.connector.dataSource = dataSource;
  implementRestMethods(dataSource.connector);
  if (callback) process.nextTick(callback);
};
