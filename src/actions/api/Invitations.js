import APIFactory from './ApiFactory';

export default {
    all: APIFactory('invitations', 'GET', true),
    get: APIFactory('invitations/:userId', 'GET', true, false),
    send: APIFactory('invitations/:userId', 'POST', true),
    confirm: APIFactory('invitations/:userId/confirm', 'POST', true),
    reject: APIFactory('invitations/:userId/reject', 'DELETE', true),
    cancel: APIFactory('invitations/:userId/cancel', 'DELETE', true),
};
