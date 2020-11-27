// REGISTER SERVICEWORKER
const registerSW = () => {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker
				.register('../../serviceworker.js').then(() => {
					console.log('Serviceworker berhasil terdaftar!.');
				})
				.catch(error => {
					console.log(error);
				});
		});
	} else {
		console.log('Browser tidak mendukung Serviceworker!.');
	}
}

export default registerSW;