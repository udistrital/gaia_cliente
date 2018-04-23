'use strict';

/**
 * @ngdoc service
 * @name contractualClienteApp.token
 * @description
 * # token
 * Factory in the contractualClienteApp.
 */

// First, parse the query string
var params = {},
  queryString = location.hash.substring(1),
  regex = /([^&=]+)=([^&]*)/g,
  m;
while (m = regex.exec(queryString)) {
  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
//console.log(params);
//console.log(location.hash.substring(1));
// And send the token over to the server
var req = new XMLHttpRequest();
// consider using POST so query isn't logged
var query = 'https://' + window.location.host + '?' + queryString;
//console.log(query);
req.open('GET', query, true);

req.onreadystatechange = function (e) {
  if (req.readyState === 4) {
    if (req.status === 200) {
      window.location = params.state;
    } else if (req.status === 400) {
      window.alert('There was an error processing the token.');
    } else {
      //alert('something else other than 200 was returned');
      //console.log(req);
    }
  }
};
/*
req.send(null);
*/
console.log(params);
for (const i in params) {
  if (params.hasOwnProperty(i)) {
    window.localStorage.setItem(i, params[i]);
  }
}

angular.module('implicitToken', [])
  .factory('token_service', function (CONF, md5) {

    var service = {
      //session: $localStorage.default(params),
      header: null,
      token: null,
      generateState: function () {
        const text = ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
        return md5.createHash(text);
      },
      setting_bearer: {
        headers: {}
      },
      login: function () {
        if (!CONF.GENERAL.TOKEN.nonce) {
          CONF.GENERAL.TOKEN.nonce = service.generateState();
        }
        if (!CONF.GENERAL.TOKEN.state) {
          CONF.GENERAL.TOKEN.state = service.generateState();
        }
        let url = CONF.GENERAL.TOKEN.AUTORIZATION_URL + '?' +
          'client_id=' + encodeURIComponent(CONF.GENERAL.TOKEN.CLIENTE_ID) + '&' +
          'redirect_uri=' + encodeURIComponent(CONF.GENERAL.TOKEN.REDIRECT_URL) + '&' +
          'response_type=' + encodeURIComponent(CONF.GENERAL.TOKEN.RESPONSE_TYPE) + '&' +
          'scope=' + encodeURIComponent(CONF.GENERAL.TOKEN.SCOPE);
        if (CONF.GENERAL.TOKEN.nonce) {
          url += '&nonce=' + encodeURIComponent(CONF.GENERAL.TOKEN.nonce);
        }
        url += '&state=' + encodeURIComponent(CONF.GENERAL.TOKEN.state);
        console.log(url);
        window.location = url;
        return url;
      },
      live_token: function () {
        if (window.localStorage.getItem('id_token') === 'undefined' || window.localStorage.getItem('id_token') === null) {
          return false;
        } else {
          return true;
        }
      },
      getPayload() {
        console.log(window.localStorage.getItem('id_token'));
        const id_token = window.localStorage.getItem('id_token').split('.');
        return JSON.parse(atob(id_token[1]));
      },
      logoutValid: function () {
        var state;
        var valid = true;
        var queryString = location.search.substring(1);
        var regex = /([^&=]+)=([^&]*)/g;
        let m;
        while (!!(m = regex.exec(queryString))) {
          state = decodeURIComponent(m[2]);
        }
        if (window.localStorage.getItem('state') === state) {
          window.localStorage.clear();
          valid = true;
        } else {
          valid = false;
        }
        return valid;
      }
    };
    return service;
  });
