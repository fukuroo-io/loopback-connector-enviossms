'use strict';
const debug = require('debug')('loopback:connector:enviossms');

module.exports = class DataAccessObject {
  /**
   * @constructor
   */
  constructor() {
    debug('Creating a DataAccessObject');
  };

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
