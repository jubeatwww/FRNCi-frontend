import { API_URL } from '../../config';

export default {
    getEvent(eventId) {
        return fetch(`${API_URL}/events/${eventId}`, {
            mode: 'cors',
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then(res => ({
            ok: true,
            ...res,
        }));
    },
    getAttendees(userId, token, events = null) {
        let url = `${API_URL}/users/${userId}/attendees`;
        if (events) {
            url = `${url}?events=${events}`;
        }
        return fetch(url, {
            mode: 'cors',
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: token,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        });
    },
};
