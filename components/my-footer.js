const template = document.createElement('template');


template.innerHTML = `
<footer style="
  background-color: #1a1a2e;
  color: #87CEEB;
  text-align: center;
  padding: 2rem 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  border-top: 2px solid #87CEEB;
  font-family: 'Courier New', monospace;
  box-shadow: 0 -5px 15px rgba(0, 255, 255, 0.3);
">
  <div class="my-name" style="
    font-size: 1.2rem;
    text-shadow: 0 0 10px #87CEEB, 0 0 20px #87CEEB;
    margin-bottom: 0.5rem;
  ">
    
  </div>
  <div style="
    font-size: 0.9rem;
    color: #;
    text-shadow: 0 0 5px #ff00ff;
  ">
    &copy; <span class="year"></span> All rights reserved
  </div>
</footer>
`;

class MyFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const name = this.textContent.trim();

    this.shadowRoot.querySelector('.my-name').innerText = name;
  
    const year = new Date().getFullYear();
    this.shadowRoot.querySelector('.year').innerText = year;
  }
}

customElements.define('my-footer', MyFooter);

export default MyFooter;