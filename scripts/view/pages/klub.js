import DataKlub from '../../data/data-klub.js';
import {
    saveForLater
} from '../../data/data-favorit-klub.js';

const Klub = {
    async renderHTML() {
        return `
            <div class="row">
                <div class="col s12">
                <h3 class="flow-text center" style="padding: 20px 0; color: #6E208D;">Klub Premier League 2020/2021</h3>
                </div>
                <div id="daftar-klub"></div>

                <div class="col s12" id="preloader">
                    <ul class="collection">
                        <li class="collection-item">
                            <div class="progress">
                                <div class="indeterminate"></div>
                            </div>
                            <p class="center">Mohon bersabar ini ujian ... <i class="tiny material-icons">mood</i></p>
                        </li>                    
                    </ul>
                </div>

            </div>
        `;
    },
    async renderAPI() {
        const preloader = document.getElementById('preloader');
        const daftarKlub = document.getElementById('daftar-klub');

        try {
            const results = await DataKlub.getDataKlub();

            // Hidden preloader
            preloader.style.display = 'none';

            results.teams.forEach(result => {
                daftarKlub.innerHTML += `
                    <div class="col s6 m4 l3">
                        <div class="card logo-club">
                                <div class="card-image">
                                    <img src="${result.crestUrl}" alt="${result.name}" height="300" />
                                </div>
                                <div class="card-action">
                                    <a class="btn btn-favorit waves-effect waves-light" style="background-color: #6E208D;"><i class="material-icons left">favorite</i>Favorit Klub</a>
                                </div>
                        </div>
                    </div>
                `;
            });

            document.querySelectorAll('.btn-favorit').forEach((element, index) => {
                element.addEventListener('click', () => {
                    saveForLater(results.teams[index]);
                });
            });

        } catch (error) {
            preloader.style.display = 'none';
            console.log(error);
        }
    }
}

export default Klub;