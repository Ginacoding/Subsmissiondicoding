import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
// Impor lainnya yang diperlukan

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });

    // kita bisa menginisiasikan komponen lain bila ada
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    console.log('Current URL:', url);  // Logging URL

    const page = routes[url];
    console.log('Current Page:', page);  // Logging Page

    if (!page) {
      console.error(`Page not found for url: ${url}`);
      this._content.innerHTML = '<p>Halaman tidak ditemukan</p>';
      return;
    }

    try {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } catch (error) {
      console.error('Error rendering page:', error);
      this._content.innerHTML = '<p>Gagal memuat halaman. Coba lagi nanti.</p>';
    }

    const skipLink = document.querySelector('.skip-content');
    const mainContent = document.querySelector('#mainContent');
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      mainContent.scrollIntoView({ behavior: 'smooth' });
      skipLink.blur();
    });
  }
}

export default App;
