import RestaurantApiSource from '../../data/RestaurantApiSource';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import { TemplateCreator } from '../template/template-creator';

const Detail = {
  async render() {
    return `
      <div id="detail-content"></div>
      <loader-element></loader-element>
      <div class="details-container">
        <form class="form-review">
          <h1 class="details-subtitle">Tambahkan Ulasanmu</h1>
          <div>
            <label>Nama</label>
            <input type="text" name="name" id="name" placeholder="Nama" required />
          </div>
          <div>
            <label>Ulasan</label>
            <textarea name="review" id="review" rows="4" placeholder="Ulasan" required></textarea>
          </div>
          <button type="submit" id="submit-review">Kirim</button>
        </form>
      </div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const contentElement = document.querySelector('#detail-content');
    const loaderElement = document.querySelector('loader-element');
    const inputName = document.querySelector('#name');
    const inputReview = document.querySelector('#review');
    const formReview = document.querySelector('.form-review');

    const url = UrlParser.parseActiveUrlWithoutCombiner();

    // Menampilkan indikator loading
    if (loaderElement) {
      loaderElement.classList.remove('hidden');
    }

    try {
      const response = await RestaurantApiSource.getRestaurantDetail(url.id);

      // Menyembunyikan indikator loading setelah data dimuat
      if (loaderElement) {
        loaderElement.classList.add('hidden');
      }

      // Menampilkan detail restoran
      if (contentElement) {
        contentElement.innerHTML += TemplateCreator.DetailRestaurant(response);
      }

      // Menangani form ulasan
      if (formReview) {
        formReview.addEventListener('submit', async (e) => {
          e.preventDefault();
          e.stopPropagation();

          const data = {
            id: url.id,
            name: inputName.value.trim(),
            review: inputReview.value.trim(),
          };

          // Validasi input
          if (!data.name || !data.review) {
            alert('Nama dan ulasan tidak boleh kosong!');
            return;
          }

          try {
            await RestaurantApiSource.mutateAddReview(data);
            alert('Ulasan berhasil dikirim!');
            inputName.value = '';  // Mengosongkan form
            inputReview.value = '';  // Mengosongkan form
          } catch (error) {
            console.error('Error adding review:', error);
            alert('Gagal mengirimkan ulasan!');
          }
        });
      }

      // Menginisialisasi tombol like
      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: response.id,
          pictureId: response.pictureId,
          name: response.name,
          city: response.city,
          rating: response.rating,
          description: response.description,
        },
      });
    } catch (error) {
      console.error('Error loading restaurant details:', error);
      if (loaderElement) {
        loaderElement.classList.add('hidden');
      }
      if (contentElement) {
        contentElement.innerHTML = '<p>Gagal memuat detail restoran. Coba lagi nanti.</p>';
      }
    }
  },
};

export default Detail;
