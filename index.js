import App from './scripts/view/App.js';
import registerSW from './scripts/utils/register-sw.js';
import registerNotif from './scripts/utils/register-notif.js';

// Improve Scrolling Performance
document.addEventListener('touchstart', () => {}, {
    passive: true
});

document.addEventListener('touchmove', event => {
    console.log(event.defaultPrevented);
    event.preventDefault();
    console.log(event.defaultPrevented);
}, {
    passive: true
});

const app = new App({
    button: document.getElementById('nav-mobile'),
    drawer: document.querySelectorAll('ul a'),
    content: document.getElementById('content')
});

window.addEventListener('hashchange', () => {
    document.getElementById('container');
    app.renderPage();
});

document.addEventListener('DOMContentLoaded', () => {
    app.renderPage();
    registerSW();
    registerNotif();
});
