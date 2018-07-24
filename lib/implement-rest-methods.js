'use strict';

/**
 * @param  {EnviosSms} instance
 */
module.exports = (instance) => {
  /**
   * @param  {String} to @required
   * @param  {String} text @required
   * @param  {String} from @default "InfoSMS"
   * @return {Promise}
   */
  instance.prototype.sendSimpleSms = (to, text, from = 'InfoSMS') => {
    return new Promise((resolve, reject) => {
      if (!to || !text) reject('"to" and "text" params are required');
      instance.methods.single({
        data: {
          from: from,
          to: to,
          text: text,
        },
        headers: instance.headers,
      }, (data, res) => {
        resolve(data);
      });
    });
  };
};
