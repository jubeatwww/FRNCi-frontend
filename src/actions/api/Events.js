import ApiFactory from './ApiFactory';

export default {
    getEvent: ApiFactory('events/:eventId', 'GET'),
    getAttendees: ApiFactory('users/:userId/attendees', 'GET', true),
};
