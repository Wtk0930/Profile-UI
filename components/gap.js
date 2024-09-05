const template = document.createElement("template");

template.innerHTML = `
<style>
.gap{
        height: 5vh;
}
</style>

<div class="gap"></div>
`

class Gap extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('gap-e', Gap);