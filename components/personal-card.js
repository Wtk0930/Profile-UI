import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";



const template = document.createElement("template");
template.innerHTML = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
<link href="../styles/base.css" rel="stylesheet"/>
<style>
    .personal-card_info-card {
      display: flex;
      flex-direction: column;
      width: fit-content;
      padding: 5vh 3vw;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      background-color: var(--basic_black);
    }

    .personal-card_info-card .pic {
      width: 250px;
      height: 250px;
      border-radius: 50%;
      background-color: #fff;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      margin-bottom: 2rem;
    }

    .personal-card_info-card .content-box {
      width: 100%;
      max-width: 600px;
    }

    .personal-card_info-card .content-text {
      color: #fff;
      word-break: break-all;
    }

    .personal-card_info-card .content-text .content-para:not(:first-child) {
      margin-top: 0.5rem;
    }

    .personal-card_info-card .tags {
      width: 100%;
      margin-top: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .personal-card_info-card .tags .tag {
      padding: 0.5rem 1rem;
      border-radius: 3px;
      border: 1px solid var(--basic_blue);
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    .personal-card_info-card .tags .tag:hover {
      background-color: var(--basic_blue);
    }

    .personal-card_info-card .tags .tag a {
      color: var(--basic_blue);
      text-decoration: none;
      transition: all 0.2s ease-in-out;
    }

    .personal-card_info-card .tags .tag:hover a {
      color: aliceblue;
    }

    .lora-basic {
      font-family: "Lora", serif;
      font-optical-sizing: auto;
      font-weight: 400;
      font-style: normal;
    }

    @media screen and (min-width: 859px) {
      .personal-card_info-card {
        flex-direction: row;
      }

      .personal-card_info-card .pic {
        width: 160px;
        height: 160px;
        margin-bottom: 0;
        margin-right: 2rem;
      }
    }

    @media screen and (min-width: 1015px) {
      .personal-card_info-card {
        flex-direction: row;
      }

      .personal-card_info-card .pic {
        width: 300px;
        height: 300px;
        margin-bottom: 0;
        margin-right: 2rem;
      }
    }
    </style>

    <div class="personal-card_info-card">
        <div class="pic">
        </div>

        <div class="content-box">
            <div class="content-text lora-basic">
                <p class="content-para">
                   this is a test

                </p>

                <p class="content-para">
                    2222222222222222222222222222222222222222222222222222222222222222222222222222222
                    222222222222222222222222222222222222222222222222222222222222222222222222222
                    222222222222222222222222222222222222222222222222222222222222222222222222222
                </p>

                <div class="content-para">
                    333333333333333333333333333333333333333333333333333333333333333333333333333333
                    333333333333333333333333333333333333333333333333333333333333333333333333333333
                    3333333333333333333333333333333333333333333333333333333333333333333333333333333
                    3333333333333333333333
                </div>
            </div>
            

            <ul class="tags">
            </ul>
        </div>

    </div>
`
class PersonalCard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.linkNames = [];
        this.linkRefs = [];
    }

    static get observedAttributes() {
        return ['avatar-src'];
    }


    connectedCallback() {
        // parse the markdown
        this.parseMarkdown(this.textContent.trim());


        // set the avatar img
        this.shadowRoot.querySelector(".personal-card_info-card .pic").style.backgroundImage = `url(${this.getAttribute("avatar-src")})`;


        this.getAttributeNames().forEach((attr)=>{
            let flag = attr.toLowerCase().startsWith("link");

            if(flag){
                if(attr.toLowerCase().endsWith("-name")){
                    this.linkNames.push(attr);
                }else if(attr.toLowerCase().endsWith("-ref")){
                    this.linkRefs.push(attr);
                }
            }
        });


        let tempFragment = document.createDocumentFragment();

        // insert the tag links
        let tagLength = this.linkNames.length;
        for(let i = 0; i < tagLength; i++){
            let tag = document.createElement("li");
            tag.classList.add("tag");

            let link = document.createElement("a");
            link.href = this.getAttribute(this.linkRefs[i]);
            link.innerText = this.getAttribute(this.linkNames[i]);

            tag.appendChild(link);
            tempFragment.appendChild(tag);
        }
        this.shadowRoot.querySelector(".personal-card_info-card .tags").appendChild(tempFragment);
    }


    parseMarkdown(markdown) {
        const lines = markdown.split('\n').map(line => line.trim());
        const content = lines.join('\n');

        let htmlContent = marked(content);
        // add class to the p tags
        htmlContent = htmlContent.replace(/<p>/g, '<p class="content-para">');

        this.shadowRoot.querySelector('.personal-card_info-card .content-text').innerHTML = marked(htmlContent);
    }
}

customElements.define('personal-card', PersonalCard);

export default PersonalCard;