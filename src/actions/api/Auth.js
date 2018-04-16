import { API_URL, FB_ID } from '../../config';
import APIFactory from './ApiFactory';

/* eslint-disable */
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = `https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&autoLogAppEvents=1&version=v2.12&appId=${FB_ID}`;
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
/* eslint-enable */

export default {
    signup: APIFactory('auth/signup', 'POST'),
    login: APIFactory('auth/login', 'POST'),
    fbLogin: APIFactory('auth/facebook', 'POST'),
    fbSignupWithEmail(email, accessToken) {
        return fetch(`${API_URL}/auth/fb-no-email`, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                email,
                access_token: accessToken,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
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
    },
};
