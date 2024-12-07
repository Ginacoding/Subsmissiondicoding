import 'regenerator-runtime'; /* for async await transpile */
import '../styles/index.scss';
import './components';
import App from './views/app';
import swRegister from './utils/sw-register';

// Ambil elemen tombol hamburger dan menu navigasi
const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
