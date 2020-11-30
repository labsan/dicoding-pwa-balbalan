import App from './scripts/view/App.js';
import registerSW from './scripts/utils/register-sw.js';
import registerNotif from './scripts/utils/register-notif.js';

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
    
    // Navigasi sidebar
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
    
    app.renderPage();
    registerSW();
    registerNotif();
});
