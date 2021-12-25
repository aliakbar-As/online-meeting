// import NetInfo from '@react-native-community/netinfo';
import { Axios } from './Api';

import { Logger } from '../Utils';
import { AuthStore } from '../Stores/AuthStore';

import axios from 'axios';

class Request {
    constructor() {
        // before send requests
        this.pendingQueue = [];

        // flag for refresh token
        this.tokenExpired = false;

        // flag for run and stop sending request
        this.isRun = false;

        /**
         * if connection is off, send again request after timeout. 
         * if not connected yet => timeout = timeout * 2
         */
        this.timeout = 2000;
    }


    /**
     * =============
     *      GET 
     * =============
     * Parameters :
     * - url: 'String'
     * - config: {Object}
     * - authorization = {Boolean}
     * 
     */

    get(
        url,
        config = {},
        authorization = true,
    ) {
        return this.add({ method: 'get', url, config, authorization });
    }

    /**
     * =============
     *      POST 
     * =============
     * Parameters :
     * - url: 'String'
     * - config: {Object}
     * - authorization = {Boolean}
     */

    post(
        url,
        data,
        config,
        authorization = true,
    ) {
        return this.add({ method: 'post', url, data, config, authorization });
    }

    /**
     * =============
     *      PUT 
     * =============
     * Parameters :
     * - url: 'String'
     * - config: {Object}
     * - authorization = {Boolean}
     */

    put(
        url,
        data,
        config = {},
        authorization = true
    ) {
        return this.add({ method: 'put', url, data, config, authorization });
    }

    /**
     * =============
     *      DELETE
     * =============
     * Parameters :
     * - url: 'String'
     * - config: {Object}
     * - authorization = {Boolean}
     */

    delete(
        url,
        config = {},
        authorization = true
    ) {
        return this.add({ method: 'delete', url, config, authorization });
    }

    /**
     * =============
     *  Add request to queue
     * =============
     */

    add(
        { method, url, data = {}, config = {}, authorization }
    ) {
        return new Promise((resolve, reject) => {
            this.removeDuplicate(url, data);
            this.send({
                method,
                url,
                data,
                config,
                authorization,
                resolve,
                reject
            });
            // this.runQueue();
        });
    }


    async send(request) {
        const { method, url, data, config, authorization, resolve, reject } = request;
        try {
            const token = localStorage.getItem('@token');
            if (authorization && token === null) reject('Token not found.');
            // console.log(`Bearer ${token}`)
            const requestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                ...config
            };
            if (authorization) {
                if (method === 'get' || method === 'delete') {
                    requestConfig.params = { ...requestConfig.params };
                } else {
                    data.token = token;
                }
            }

            let response = null;
            if (method === 'get') {
                Logger(request, 'request');
                response = await Axios({ method, url, ...requestConfig });
            } else if (method === 'post') {
                response = await Axios({ method, url, data, ...requestConfig });
                Logger({ method, url, data, ...requestConfig }, 'Post');
            } else if (method === 'delete') {
                response = await Axios({ method, url, ...requestConfig });
            } else if (method === 'put') {
                Logger({ method, url, data, ...requestConfig }, 'Put');
                response = await Axios({ method, url, data, ...requestConfig });
            }

            if (response.data.StatusCode === 401) {
                this.expiredToken();
                resolve(response);
            } else {
                resolve(response);
            }
        } catch (error) {
            Logger(error, 'requestLog');
            // Logger(error.response.status, 'requestLog');
            if (error.response.status === 401) {
                this.expiredToken();
            }
            Logger(request, 'request');
            this.pendingQueue.pop();

            if (error.response !== undefined && error.response.status === 403) {
                this.pendingQueue.push(request);
                // this.refreshToken();
            }
            reject(error);
        }
    }

    // refreshToken() {
    //     // new token 
    //     this.runQueue();
    // }

    async expiredToken() {
        console.log('expired token')
        localStorage.removeItem('@token');

        AuthStore.refreshToken();
    };

    removeDuplicate(url, data) {
        for (let i = 0; i < this.pendingQueue.length; i++) {
            if (
                JSON.stringify(this.pendingQueue[i].data === JSON.stringify(data)) &&
                this.pendingQueue[i].url === url
            ) {
                this.pendingQueue.splice(i, 1);
            }
        }
    }
}

export const request = new Request();
