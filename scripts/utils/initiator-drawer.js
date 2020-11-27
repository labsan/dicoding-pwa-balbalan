const initiatorDrawer = {
    init({
        button,
        drawer
    }) {
        this.toggleDrawer(button);
        this.closeDrawer(drawer, button);
    },
    toggleDrawer(button) {
        M.Sidenav.init(button);
    },
    closeDrawer(drawer, button) {
        drawer.forEach(item => {
            item.addEventListener('click', () => {
                M.Sidenav.getInstance(button).close();
            });
        });
    }
}

export default initiatorDrawer;