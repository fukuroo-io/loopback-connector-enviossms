'use strict';
const debug = require('debug')('loopback:connector:enviossms');
const EnviosSms = require('./enviossms');

/**
 * @param  {DataSource} dataSource
 * @param  {Function} callback
 */
module.exports = (dataSource, callback) => {
  debug('Init enviossms connector');
  dataSource.connector = new EnviosSms(dataSource.settings);
  dataSource.connector.dataSource = dataSource;
  if (callback) process.nextTick(callback);
};
