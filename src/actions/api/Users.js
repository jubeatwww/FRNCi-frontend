import { API_URL } from '../../config';
import APIFactory from './ApiFactory';

export default {
    get: APIFactory('users/:userId', 'GET', true),
    profile: APIFactory('users/:userId/profile', 'GET', true),
    update: APIFactory('users/:userId', 'PUT', true),
    integrity: APIFactory('users/:userId/integrity', 'GET', true),
    resendVerifyEmail: APIFactory('users/:userId/resend-verify', 'POST', true),
    confirmEmailVerify: APIFactory('users/:userId/confirm-verify', 'POST', true),
    forgotPassword: APIFactory('users/forgot-pw', 'POST', false),
    resetPassword: APIFactory('users/reset-pw', 'POST', false),
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
            return res.json().then((err) => {
                const error = {
                    response: res,
                    error: err,
                };
                throw error;
            });
        }).then(res => ({
            ok: true,
            ...res,
        })).catch((err) => {
            console.error(err);
            alert(err.error.message);
            return err;
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
            return res.json().then((err) => {
                const error = {
                    response: res,
                    error: err,
                };
                throw error;
            });
        }).then(result => result.paid);
    },
};
