import { API_URL } from '../../config';

export default {
    async get(userId = '', token = '') {
        const result = await fetch(`${API_URL}/users/${userId}`, {
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
        }).then(res => ({
            ok: true,
            ...res,
        })).catch((err) => {
            console.error(err);
            return err;
        });
        return result;
    },
    async update(userId = '', token = '', data = {}) {
        const result = await fetch(`${API_URL}/users/${userId}`, {
            mode: 'cors',
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: token,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then(res => ({
            ok: true,
            ...res,
        })).catch((err) => {
            console.error(err);
            return err;
        });
        return result;
    },
    async integrity(userId = '', token = '') {
        const result = await fetch(`${API_URL}/users/${userId}/integrity`, {
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
        }).then(res => ({
            ok: true,
            ...res,
        })).catch((err) => {
            console.error(err);
            return err;
        });
        return result;
    },
    async uploadPhoto(userId = '', token = '', photo = undefined) {
        const formdata = new FormData();
        formdata.append('image', photo);
        const result = await fetch(`${API_URL}/users/${userId}/profile-photo`, {
            mode: 'cors',
            method: 'POST',
            body: formdata,
            headers: new Headers({
                Authorization: token,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then(res => ({
            ok: true,
            ...res,
        })).catch((err) => {
            console.error(err);
            return err;
        });
        return result;
    },
    async resendVerifyEmail(userId = '', token = '') {
        const result = await fetch(`${API_URL}/users/${userId}/resend-verify`, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({ uesrId: userId }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: token,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then(res => ({
            ok: true,
            ...res,
        })).catch((err) => {
            console.error(err);
            return err;
        });
        return result;
    },
    async confirmEmailVerify(userId = '', authToken = '', verifyToken = '') {
        const result = await fetch(`${API_URL}/users/${userId}/confirm-verify`, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({ userId, token: verifyToken }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: authToken,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then(res => ({
            ok: true,
            ...res,
        })).catch((err) => {
            console.error(err);
        });
        return result;
    },
    paid(userId, authToken) {
        return fetch(`${API_URL}/users/${userId}/paid`, {
            mode: 'cors',
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: authToken,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then(result => result.paid);
    },
};
