window.gtag = function gtag() {
    window.dataLayer = window.dataLayer || [];
    /* eslint-disable */
    window.dataLayer.push(arguments);
    /* eslint-enable */
};

export default function addGtag(gtagId) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
    window.gtag('js', new Date());
    window.gtag('config', gtagId);
    let n = document.getElementsByTagName('head')[0];
    if (!n) {
        n = document.body;
    }
    n.appendChild(s);
}
