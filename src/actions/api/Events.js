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
    getAttendees(userId, token) {
        return fetch(`${API_URL}/users/${userId}/attendees`, {
            mode: 'cors',
            method: 'GET',
            header: new Headers({
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
