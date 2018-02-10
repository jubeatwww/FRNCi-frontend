import { API_URL } from '../config';

export default function loadProducts(nationality) {
    const tags = nationality === 'tw' ? ['201803', 'tw_only'] : ['201803', 'fn_only'];
    return fetch(`${API_URL}/products?tags=${tags}`, {
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
    });
}
