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
};
