import Pertandingan from '../view/pages/pertandingan.js';
import Klasemen from '../view/pages/klasemen.js';
import Klub from '../view/pages/klub.js';
import InfoKlub from '../view/pages/info-klub.js';
import FavoritKlub from '../view/pages/favorit-klub.js';

const route = {
    '/': Pertandingan,
    '/pertandingan': Pertandingan,
    '/klasemen': Klasemen,
    '/daftar-klub': Klub,
    '/info-klub/:id': InfoKlub,
    '/favorit-klub': FavoritKlub
}

export default route;