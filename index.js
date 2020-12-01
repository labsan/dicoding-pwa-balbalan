import App from './scripts/view/App.js';
import registerSW from './scripts/utils/register-sw.js';
import registerNotif from './scripts/utils/register-notif.js';

const app = new App({
    button: document.getElementById('mobile-nav'),
    drawer: document.querySelectorAll('ul li'),
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
