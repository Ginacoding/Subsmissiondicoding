// Custom element definition (pastikan ini ada dalam berkas JS yang diload)
class HeroElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const image = this.getAttribute('image') || 'hero-image_2.jpg'; // Gambar default
    const alt = this.getAttribute('alt') || 'Hero image'; // Deskripsi default
    const title = this.getAttribute('title') || 'Welcome to RestoQu'; // Judul default
    const subtitle =
      this.getAttribute('subtitle') || 'Delicious food awaits you!'; // Subtitle default

    this.shadowRoot.innerHTML = `
      <style>
        .hero {
          position: relative;
          width: 100%;
          overflow: hidden;
          height: 100vh; /* Tambahkan tinggi untuk memastikan elemen terlihat */
        }

        .hero-background {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Tambahkan object-fit untuk mengatur gambar */
        }

        .content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          text-align: center;
          z-index: 1;
          background-color: rgba(0, 0, 0, 0.5); /* Overlay semi-transparan */
          padding: 20px;
          border-radius: 10px;
        }

        .content h2 {
          font-size: 2.5em;
          margin: 0 0 10px;
          font-family: 'Pacifico', cursive;
        }

        .content p {
          font-size: 1.2em;
          margin: 0;
        }

        /* Media query untuk mengatur tampilan pada viewport lebih kecil dari 1200px */
        @media (max-width: 1200px) {
          .hero-background {
            min-width: unset; /* Nonaktifkan min-width */
            width: 100%; /* Full-width pada viewport <1200px */
          }

          .content {
            width: 90%; /* Sesuaikan lebar konten */
            padding: 15px;
          }

          .content h2 {
            font-size: 2em;
          }

          .content p {
            font-size: 1em;
          }
        }

        /* Media query tambahan untuk perangkat mobile */
        @media (max-width: 600px) {
          .hero {
            height: 300px; /* Mengurangi tinggi hero */
          }

          .hero-background {
            height: 100%;
            object-fit: cover;
          }

          .content {
            padding: 10px;
          }

          .content h2 {
            font-size: 1.5em;
          }

          .content p {
            font-size: 0.9em;
          }
        }
      </style>
      <div class="hero">
        <img
          src="${image}"
          alt="${alt}"
          class="hero-background"
        />
        <div class="content">
          <h2>${title}</h2>
          <p>${subtitle}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('hero-element', HeroElement);
