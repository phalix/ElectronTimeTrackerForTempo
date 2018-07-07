//


define(['../../lodash','./../StorageService',],function(_,StorageService){
    var o = {};
    o.API_TYPE = 'rest';
    
    o.requestMethod = function(method, url, body){
        const request = require.nodeRequire('request');
        const options = {
            method,
            url,
            headers: {
                'cache-control': 'no-cache',
                origin: StorageService.getInstanceURL(),
                authorization: `Basic ${StorageService.getApiKey()}`,
                'x-atlassian-token': 'nocheck',
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: body,
            json: true,
            strictSSL: false
        };
        //return fetch(url,options);
        request(options, (error, response, body) => {
            if (error) throw new Error(error);
    
            console.log(body);
        });
    
        return Promise.resolve({});

    }
    
    // TODO: Use Request for fetch requests as well
    o.get = function(url, options){
        options = {
            method: 'GET',
            headers: options.headers,
            mode: options.mode,
            cache: options.cache,
            rejectUnauthorized: false,
            strictSSL: false
        };
        return fetch(url, options);
    }
    
    o.buildOptions = function() {
        return o.buildHeadersWithApiKey(StorageService.getApiKey());
    }
    
    o.buildHeadersWithApiKey = function(apiKey) {
        const headers = {
            Authorization: `Basic ${apiKey}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
    
        return {
            headers,
            mode: 'cors',
            cache: 'default'
        };
    }
    
    o.createApiKeyFromCredentials = function(username, password) {
        return window.btoa(`${username}:${password}`);
    }
    
    o.buildUrlQuery = function(queryObject) {
        const parts = [];
    
        Object.keys(queryObject).forEach(query => {
            if (Object.prototype.hasOwnProperty.call(queryObject, query) && !_.isEmpty(queryObject[query])) {
                parts.push(encodeURIComponent(query) + '=' + encodeURIComponent(queryObject[query]));
            }
        });
    
        const queryString = parts.join('&');
    
        return queryString ? '?' + queryString : '';
    }



    return o;

})
