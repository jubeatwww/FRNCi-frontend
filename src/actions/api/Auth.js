import { API_URL } from '../../config';

export default {
    async signup(signupInfo = { firstName: '', lastName: '', email: '', password: '' }) {
        const result = await fetch(`${API_URL}/auth/signup`, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(signupInfo),
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
        })).catch((err) => {
            console.error(err);
            return err;
        });
        return result;
    },
    async login(loginInfo = { email: '', password: '' }) {
        const result = await fetch(`${API_URL}/auth/login`, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(loginInfo),
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
        })).catch((err) => {
            console.error(err);
            return err;
        });
        return result;
    },
    async fbLogin(accessToken = '') {
        const result = await fetch(`${API_URL}/auth/facebook`, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({ access_token: accessToken }),
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
        })).catch((err) => {
            console.error(err);
            return err;
        });
        return result;
    },
};
