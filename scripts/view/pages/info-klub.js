import DataKlub from '../../data/data-klub.js';
import parseURL from '../../routes/parse-url.js';

const InfoKlub = {
    async renderHTML() {
        return `
            <div class="row">
                <div class="col s12">
                    <h3 class="flow-text center" style="padding: 20px 0; line-height: 1.5em; color: #6E208D;">Informasi Klub Premier League 2020/2021</h3>
                </div>
                <div class="col s12">
                <ul class="collection with-header" id="info-klub"></ul>
                </div>

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
        const url = parseURL.parseActiveUrlWithoutCombiner();
        const infoKlub = document.getElementById('info-klub');

        try {
            const result = await DataKlub.getDataInfoKlub(url.id);

            // Hidden preloader
            preloader.style.display = 'none';

            infoKlub.innerHTML += `
                <li class="collection-header center">
                    <img class="responsive-img" src="${result.crestUrl}" alt="${result.name}" style="margin: 25px auto" />
                </li>
                <li class="collection-item">Nama: ${result.name}</li>
                <li class="collection-item">Nama Singkat: ${result.shortName}</li>
                <li class="collection-item">TLA: ${result.tla}</li>
                <li class="collection-item">Warna Klub: ${result.clubColors}</li>
                <li class="collection-item">Didirikan: ${result.founded}</li>
                <li class="collection-item">Lokasi: ${result.venue}</li>
                <li class="collection-item">Alamat: ${result.address}</li>
                <li class="collection-item">Email: ${result.email}</li>
                <li class="collection-item">Telp: ${result.phone}</li>
                <li class="collection-item">Website: <a href=${result.website} class="info-klub-website" target="_blank" rel="noopener">${result.website}</a></li>
            `;

        } catch (error) {
            preloader.style.display = 'none';
            console.log(error);
        }
    }
}

export default InfoKlub;