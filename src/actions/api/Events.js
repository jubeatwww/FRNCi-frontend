import APIFactory from './ApiFactory';

export default {
    getEvent: APIFactory('events/:eventId', 'GET'),
    getAttendees: APIFactory('users/:userId/attendees', 'GET', true),
};
