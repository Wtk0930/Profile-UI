const template = document.createElement("template");

template.innerHTML = `
<style>
        @import url('../styles/base.css');

        .my-name{
            height: 20vh;
            line-height: 20vh;
            color: var(--basic_blue);
            text-align: center;
            font-size: 3rem;
        }

        .my-name .text{
            display: inline-block; 
            transition: all .2s ease-in-out;
        }

        .my-name .text:hover{
            transform: skew(15deg, 2deg) scale(1.1);
            text-shadow: 1px 1px 2px #00ffff, -1px -1px 2px #ff00ff;
        }
</style>


<h1 class="my-name handjet italic-font font-weight-800">
    <span class="text">Tengkai &nbsp;Wang</span>
</h1>
`

class PersonalName extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){
        const name = this.textContent.trim()

        this.shadowRoot.querySelector(".my-name .text").innerText = name;
    }
}

customElements.define('personal-name', PersonalName);

export default PersonalName;