class DataPertandingan {
    static async getDataPertandingan() {
        return fetch('https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED', {
            headers: {
                'X-Auth-Token': '10640e9c5b604bc18639cf7abe15446c'
            }
        }).then(response => {
            if (response.status !== 200) {
                return Promise.reject(new Error(response.statusText));
            } else {
                return Promise.resolve(response);
            }
        }).then(response => {
            return response.json();
        }).catch(error => {
            console.log(error);
        })
    }
}

export default DataPertandingan;