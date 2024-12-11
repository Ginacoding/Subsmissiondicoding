import 'regenerator-runtime'; /* for async await transpile */
import '../styles/index.scss';
import './components';
import App from './views/app';
import swRegister from './utils/sw-register';

// Import lazysizes dan plugin parent-fit
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// Ambil elemen tombol hamburger dan menu navigasi
const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});



// Menggunakan event hashchange dan load untuk merender halaman
window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();  // Menambahkan register service worker
});
