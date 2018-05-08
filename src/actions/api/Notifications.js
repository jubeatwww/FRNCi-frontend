import APIFactory from './ApiFactory';

export default {
    unread: APIFactory('notifications/unread-count', 'GET', true),
};
