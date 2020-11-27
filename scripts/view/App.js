import parseURL from '../routes/parse-url.js';
import route from '../routes/route.js';
import initiatorDrawer from '../utils/initiator-drawer.js';

class App {
    constructor({
        button,
        drawer,
        content
    }) {
        this.button = button;
        this.drawer = drawer;
        this.content = content;

        this.initialAppShell();
    }

    initialAppShell() {
        initiatorDrawer.init({
            button: this.button,
            drawer: this.drawer
        })
    }

    async renderPage() {
        const url = parseURL.parseActiveUrlWithCombiner();
        const page = route[url];

        this.content.innerHTML = await page.renderHTML();
        await page.renderAPI();
    }
}

export default App;