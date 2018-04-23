import APIFactory from './ApiFactory';

export default {
    all: APIFactory('messages', 'GET', true),
    get: APIFactory('messages/:userId', 'GET', true),
    send: APIFactory('messages/:userId', 'POST', true),
};
