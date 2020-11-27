import urlBase64ToUint8Array from './urlBase64ToUint8Array.js';

const registerNotif = () => {
    if ('Notification' in window) {
        Notification.requestPermission().then(result => {
            if (result === 'denied') {
                console.log('Fitur notifikasi tidak di-izinkan!');
                return;
            } else if (result === 'default') {
                console.log('Pengguna menutup kotak dialog permintaan izin!');
                return;
            }

            navigator.serviceWorker.ready.then(() => {
                if (('PushManager') in window) {
                    navigator.serviceWorker.getRegistration().then(req => {
                        req.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array('BGZPp2sGRnygud2-Su912e1K5sUnWAxLLM_MafCkRa2fhznljw_2Tzbgnjkk-katHHb3iiNvgAg0eQhb8fBAvuk')
                        }).then(subscribe => {
                            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                            console.log('Berhasil melakukan subscribe dengan p256dh key: ',
                                btoa(String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey('p256dh'))))
                            );
                            console.log('Berhasil melakukan subscribe dengan auth key: ',
                                btoa(String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey('auth'))))
                            );
                        }).catch(error => {
                            console.error('Tidak dapat melakukan subscribe ', error.message);
                        });
                    });
                }
            });
        });
    }
}

export default registerNotif;