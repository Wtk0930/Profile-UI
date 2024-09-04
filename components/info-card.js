import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";


const template = document.createElement('template');
template.innerHTML = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
  <style>
    .info-card_card {
      width: 100%;
      max-width: 60vw;
      padding: 6vh 3vw;
      border-radius: 5px;
      background-color: var(--basic_black);
    }
    .info-card_card-title {
      color: var(--basic_blue);
    }

    .info-card_card-content {
       color: white;
    }
    
    .info-card_card-content p{
    }

    .lora-basic {
      font-family: "Lora", serif;
      font-optical-sizing: auto;
      font-weight: 400;
      font-style: normal;
    }
  </style>

  <div class="info-card_card">
    <div class="info-card_card-title">
      <h2></h2>
    </div>

    <div class="info-card_card-content LORA"></div>
  </div>
`;

class InfoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['markdown'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'markdown') {
      this.parseMarkdown(newValue);
    }
  }

  connectedCallback() {
    const markdown = this.textContent.trim();
    
    this.parseMarkdown(markdown);
  }

  parseMarkdown(markdown) {
    
    const lines = markdown.split('\n').map(line => line.trim());
    const titleLine = lines.find(line => line.startsWith('# '));
    const contentLines = lines.filter(line => !line.startsWith('# '));

    const title = titleLine ? titleLine.slice(2).trim() : '';
    const content = contentLines.join('\n');

    console.log(content);
    
    this.shadowRoot.querySelector('.info-card_card-title h2').innerText = title;
    this.shadowRoot.querySelector('.info-card_card-content').innerHTML = this.markdownToHTML(content);
  }

  markdownToHTML(markdown) {
    return marked.parse(markdown);
  }
}

customElements.define('info-card', InfoCard);