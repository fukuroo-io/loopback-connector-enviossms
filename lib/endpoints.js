'use strict';

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
