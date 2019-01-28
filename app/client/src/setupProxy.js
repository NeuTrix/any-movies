import {url_local_api} from './helpers/api.helper';

const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/api', 
    { target: `${url_local_api}` }
  ));
};