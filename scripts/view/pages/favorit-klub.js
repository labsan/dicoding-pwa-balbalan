import {
    getAll,
    deleteById
} from '../../data/data-favorit-klub.js';

const FavoritKlub = {
    async renderHTML() {
        return `
            <div class="row">
                <div class="col s12">
                    <h3 class="flow-text center" style="padding: 20px 0; color: #6E208D;">Favorit Klub Premier League Anda</h3>
                </div>
                <div id="daftar-favorit-klub"></div>
            </div>
        `;
    },
    async renderAPI() {
        const daftarFavoritKlub = document.getElementById('daftar-favorit-klub');

        try {
            const results = await getAll();

            if (results.length === 0) {
                daftarFavoritKlub.innerHTML = `
                    <div class="col s12">
                        <ul class="collection">
                            <li class="collection-item">
                                <p class="center">Tidak ada klub favorit anda ... <i class="tiny material-icons">mood_bad</i></p>
                            </li>                    
                        </ul>
                    </div>
                `;
            } else {
                results.forEach(result => {
                    daftarFavoritKlub.innerHTML += `
                        <div class="col s6 m4 l3">
                            <div class="card logo-club">
                                    <div class="card-image">
                                        <img src="${result.crestUrl}" alt="${result.name}" height="300" />
                                    </div>
                                    <div class="card-action">
                                        <a class="btn btn-hapus waves-effect waves-light" style="background-color: #B50000;"><i class="material-icons left">delete</i>Hapus Klub</a>
                                        <a href="#/info-klub/${result.id}" class="btn btn-selengkapnya waves-effect waves-light" style="background-color: #6E208D;">Selengkapnya</a>
                                    </div>
                            </div>
                        </div>
                    `;
                });
            }

            document.querySelectorAll('.btn-hapus').forEach((element, index) => {
                element.addEventListener('click', () => {
                    deleteById(results[index].id);
                });
            });

        } catch (error) {
            console.log(error);
        }
    }
}

export default FavoritKlub;

// if (results.length === 0) {
//     daftarFavoritKlub = `
//     <div class="col s12">
//         <ul class="collection">
//             <li class="collection-item">
//                 <p class="center">Klub favorit anda tidak ada <i class="tiny material-icons">mood_bad</i></p>
//             </li>                    
//         </ul>
//     </div>
// `;
// }