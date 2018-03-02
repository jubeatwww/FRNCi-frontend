import { API_URL } from '../../config';

export default (path = '', method = 'GET', requireAuth = false) => async (body = {}, userid = undefined) => {
    let headers = {};
    if (requireAuth) {
        const token = localStorage.getItem('_token');
        if (token) {
            headers = {
                'Content-Type': 'application/json',
                Authorization: token,
            };
        } else {
            return {
                ok: false,
                error: {
                    message: 'Need login',
                },
            };
        }
    } else {
        headers = { 'Content-Type': 'application/json' };
    }

    const parsedPath = userid ? path.replace(':userid', userid) : path;

    const result = await fetch(`${API_URL}/${parsedPath}`, {
        mode: 'cors',
        method,
        body: JSON.stringify(body),
        headers: new Headers(headers),
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
};
