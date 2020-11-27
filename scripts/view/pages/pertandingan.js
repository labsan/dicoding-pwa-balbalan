import DataPertandingan from '../../data/data-pertandingan.js';

const loadImg = clubId => `https://crests.football-data.org/${clubId}.svg`;

const Pertandingan = {
    async renderHTML() {
        return `
                <div class="row">
                    <div class="col s12">
                        <h3 class="flow-text center" style="padding: 20px 0; line-height: 1.5em; color: #6E208D;">Jadwal Pertandingan Premier League 2020/2021</h3>
                    </div>
                    <div class="col s12">
                        <table class="tbl-pertandingan striped" id="daftar-pertandingan"></table>
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
        const daftarPertandingan = document.getElementById('daftar-pertandingan');

        try {
            const results = await DataPertandingan.getDataPertandingan();

            // Hidden preloader
            preloader.style.display = 'none';

            results.matches.forEach(result => {

                let tbody = document.createElement('tbody');

                tbody.innerHTML += `
                    <tr rowspan="3">
                        <tr>
                            <td colspan="5" class="center" style="font-size: 1em; color: #6E208D;"> Matchweek ${result.matchday}</td>
                        </tr>
                        <tr>
                            <td class="hide-on-med-and-down right-align">
                                <a class="txt-pertandingan-klub" href="#/info-klub/${result.homeTeam.id}">
                                    ${result.homeTeam.name}
                                </a>
                                
                            </td>
                            <td class="right-align" width="70">
                                <a href="#/info-klub/${result.homeTeam.id}">
                                    <img class="responsive-img" src="${loadImg(result.homeTeam.id)}" alt="${result.homeTeam.name}" width="50" height="60" />
                                </a>
                            </td>
                            <td class="versus-text center" width="50">VS</td>
                            <td class="left-align" width="70">
                                <a href="#/info-klub/${result.awayTeam.id}">
                                    <img class="responsive-img" src="${loadImg(result.awayTeam.id)}" alt="${result.awayTeam.name}" width="50" height="60" />
                                </a>
                            </td>
                            <td class="hide-on-med-and-down left-align">
                                <a class="txt-pertandingan-klub" href="#/info-klub/${result.awayTeam.id}">
                                    ${result.awayTeam.name}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="5" class="center">
                                <img src="../../../images/icon-mola-tv.png" width="24" height="24" alt="Mola TV" />
                            </td>
                        </tr>
                    </tr>
                    
                    
                `;

                daftarPertandingan.appendChild(tbody);
            });
        } catch (error) {
            preloader.style.display = 'none';
            console.log(error);
        }
    }
}

export default Pertandingan;

// Matchweek ${result.matchday}