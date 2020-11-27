import DataKlasemen from '../../data/data-klasemen.js';

const Klasemen = {
    async renderHTML() {
        return `
                <div class="row">
                    <div class="col s12">
                        <h3 class="flow-text center" style="padding: 20px 0; color: #6E208D;">Klasemen Premier League 2020/2021</h3>
                    </div>
                    <div class="col s12">
                        <table class="striped centered">
                            <thead style="color: #6E208D;">
                                <tr>
                                    <th>Pos</th>
                                    <th>Team</th>
                                    <th class="hide-on-med-and-down"></th>
                                    <th>P</th>
                                    <th>W</th>
                                    <th>D</th>
                                    <th>L</th>
                                    <th>F/A</th>
                                    <th>Pts</th>
                                </tr>
                            </thead>
                            <tbody id="daftar-klasemen"></tbody>
                        </table>

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
                </div>
                `;
    },
    async renderAPI() {
        const preloader = document.getElementById('preloader');
        const daftarKlasemen = document.getElementById('daftar-klasemen');

        try {
            const results = await DataKlasemen.getDataKlasemen();

            // Hidden preloader
            preloader.style.display = 'none';

            results.standings[0].table.forEach(result => {
                let row = document.createElement('tr');
                row.innerHTML = `<td>${result.position}</td>`;
                row.innerHTML += `<td>
                                    <a href="#/info-klub/${result.team.id}">
                                        <img class="responsive-img" src="${result.team.crestUrl}" alt="${result.team.name}" width="50" height="60" />
                                    </a>
                                </td>`;

                row.innerHTML += `<td class="hide-on-med-and-down">
                                    <a href="#/info-klub/${result.team.id}">
                                        <div style="padding: 10px">
                                            <span class="nama-klub hide-on-med-and-down left">
                                                ${result.team.name}
                                            </span>
                                        </div>
                                    </a>
                            </td>`;

                row.innerHTML += `<td>${result.playedGames}</td>`;
                row.innerHTML += `<td>${result.won}</td>`;
                row.innerHTML += `<td>${result.draw}</td>`;
                row.innerHTML += `<td>${result.lost}</td>`;
                row.innerHTML += `<td>${result.goalsFor}/${result.goalsAgainst}</td>`;
                row.innerHTML += `<td>${result.points}</td>`;

                daftarKlasemen.appendChild(row);
            });
        } catch (error) {
            preloader.style.display = 'none';
            console.log(error)
        }
    }
}

export default Klasemen;