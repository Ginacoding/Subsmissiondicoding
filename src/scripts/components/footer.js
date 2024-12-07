class FooterElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer class="container">
        <p>Copyright © 2024 - RestoQu. All Rights Reserved.</p>
      </footer>
            `;
  }
}

customElements.define('footer-element', FooterElement);
