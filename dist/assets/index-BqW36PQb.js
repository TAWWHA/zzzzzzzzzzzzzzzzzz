(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const c=[{id:1,title:"GHEYCHI",location:"TEHRAN, IRAN",year:"2017",type:"EVENT",tags:["Music","Performance","Art"],description:"An experimental music and performance art event.",image:"https://picsum.photos/400/300?1"},{id:2,title:"PINEAL",location:"BERLIN, GERMANY",year:"2023",type:"EVENT",tags:["Exhibition","Visual Arts"],description:"Contemporary art exhibition featuring emerging artists.",image:"https://picsum.photos/400/300?2"},{id:3,title:"SONIC WAVES",location:"ISTANBUL, TURKEY",year:"2022",type:"FESTIVAL",tags:["Music","Technology"],description:"Electronic music and digital art festival.",image:"https://picsum.photos/400/300?3"},{id:4,title:"DIGITAL DREAMS",location:"DUBAI, UAE",year:"2023",type:"EXHIBITION",tags:["Digital Art","NFT"],description:"Showcase of digital artworks and NFT collections.",image:"https://picsum.photos/400/300?4"},{id:5,title:"URBAN PULSE",location:"CAIRO, EGYPT",year:"2022",type:"FESTIVAL",tags:["Street Art","Music"],description:"Urban culture celebration featuring street artists.",image:"https://picsum.photos/400/300?5"},{id:6,title:"ECHO CHAMBER",location:"AMSTERDAM, NL",year:"2023",type:"INSTALLATION",tags:["Sound Art","Interactive"],description:"Interactive sound installation experience.",image:"https://picsum.photos/400/300?6"},{id:7,title:"LIGHT FORMS",location:"PARIS, FRANCE",year:"2023",type:"EXHIBITION",tags:["Light Art","Installation"],description:"Immersive light art installations.",image:"https://picsum.photos/400/300?7"},{id:8,title:"NEURAL BEATS",location:"TOKYO, JAPAN",year:"2023",type:"PERFORMANCE",tags:["AI","Music","Tech"],description:"AI-powered musical performance series.",image:"https://picsum.photos/400/300?8"},{id:9,title:"VIRTUAL HORIZONS",location:"SEOUL, KOREA",year:"2023",type:"EXHIBITION",tags:["VR","Digital Art"],description:"Virtual reality art experiences.",image:"https://picsum.photos/400/300?9"},{id:10,title:"SOUND GARDEN",location:"LONDON, UK",year:"2023",type:"INSTALLATION",tags:["Sound","Nature","Art"],description:"Outdoor sound art installation.",image:"https://picsum.photos/400/300?10"},{id:11,title:"DATA FLOW",location:"BARCELONA, SPAIN",year:"2023",type:"EXHIBITION",tags:["Data Art","Interactive"],description:"Interactive data visualization exhibition.",image:"https://picsum.photos/400/300?11"},{id:12,title:"CYBER DREAMS",location:"BERLIN, GERMANY",year:"2023",type:"EVENT",tags:["Digital","Performance"],description:"Cyberpunk-inspired multimedia event.",image:"https://picsum.photos/400/300?12"}];function u(o){return`
        <article class="project-card card-hover">
            <div class="project-card-image">
                <img src="${o.image}" alt="${o.title}" class="image-transition">
            </div>
            <div class="project-info">
                <div>
                    <h3>${o.title}</h3>
                    <p class="project-meta">${o.year} - ${o.location} • <span class="project-type">${o.type}</span></p>
                    <p class="project-description">${o.description}</p>
                </div>
            </div>
        </article>
    `}class p{constructor(){this.cursor=document.createElement("div"),this.cursor.className="custom-cursor",document.body.appendChild(this.cursor),this.onMouseMove=this.onMouseMove.bind(this),this.init()}init(){document.addEventListener("mousemove",this.onMouseMove)}onMouseMove(e){requestAnimationFrame(()=>{this.cursor.style.left=`${e.clientX}px`,this.cursor.style.top=`${e.clientY}px`})}}function m(){new p}class v{constructor(){this.currentSlide=0,this.slideInterval=null,this.normalInterval=5e3,this.manualInterval=1e4,this.isManualScroll=!1}createSlideShowHTML(e){return`
            <div class="slideshow">
                <div class="slideshow-container">
                    ${e.map((t,i)=>`
                        <div class="slide ${i===0?"active":""}" data-index="${i}">
                            <img src="${t}" alt="Project image">
                        </div>
                    `).join("")}
                </div>
                <button class="slide-nav-button slide-nav-prev" aria-label="Previous slide">←</button>
                <button class="slide-nav-button slide-nav-next" aria-label="Next slide">→</button>
                <div class="slide-nav">
                    ${e.map((t,i)=>`
                        <button class="slide-dot${i===0?" active":""}" data-index="${i}"></button>
                    `).join("")}
                </div>
            </div>
        `}initializeControls(e){const t=e.querySelector(".slideshow");t.querySelector(".slide-nav-prev").addEventListener("click",()=>this.prevSlide(t,!0)),t.querySelector(".slide-nav-next").addEventListener("click",()=>this.nextSlide(t,!0)),t.querySelectorAll(".slide-dot").forEach(i=>{i.addEventListener("click",()=>{this.goToSlide(parseInt(i.dataset.index,10),t,!0)})})}prevSlide(e,t){const i=(this.currentSlide-1+3)%3;this.goToSlide(i,e,t)}nextSlide(e,t){const i=(this.currentSlide+1)%3;this.goToSlide(i,e,t)}goToSlide(e,t,i){const s=t.querySelectorAll(".slide"),r=t.querySelectorAll(".slide-dot");s[this.currentSlide].classList.remove("active"),r[this.currentSlide].classList.remove("active"),this.currentSlide=e,s[this.currentSlide].classList.add("active"),r[this.currentSlide].classList.add("active"),i&&(this.isManualScroll=!0,this.restartSlideshow(t))}startSlideshow(e){this.stopSlideshow();const t=e.querySelector(".slideshow");this.slideInterval=setInterval(()=>{const i=(this.currentSlide+1)%3;this.goToSlide(i,t,!1)},this.normalInterval)}restartSlideshow(e){this.stopSlideshow();const t=e.querySelector(".slideshow");this.slideInterval=setInterval(()=>{this.isManualScroll=!1,this.startSlideshow(e);const i=(this.currentSlide+1)%3;this.goToSlide(i,t,!1)},this.manualInterval)}stopSlideshow(){this.slideInterval&&(clearInterval(this.slideInterval),this.slideInterval=null)}}class S{static createHTML(e){return`
            <div class="modal-info">
                <h2>${e.title}</h2>
                <div class="meta">
                    <span>${e.year}</span>
                    <span>${e.location}</span>
                    <span>${e.type}</span>
                </div>
                <div class="description">
                    <p>${e.description}</p>
                    <p>Additional context and information about the project goes here. 
                       This section can be expanded with more detailed content specific to each project.</p>
                </div>
            </div>
        `}}class f{constructor(){this.createModal(),this.slideshow=new v}createModal(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">×</button>
                <div id="slideshow-container"></div>
                <div id="project-info-container"></div>
            </div>
        `,document.body.appendChild(e),this.modal=e,this.modal.querySelector(".modal-close").addEventListener("click",()=>this.close()),this.modal.addEventListener("click",t=>{t.target===this.modal&&this.close()})}open(e){const t=[e.image,e.image.replace("?","?demo2-"),e.image.replace("?","?demo3-")],i=this.modal.querySelector("#slideshow-container");i.innerHTML=this.slideshow.createSlideShowHTML(t),this.slideshow.initializeControls(i);const s=this.modal.querySelector("#project-info-container");s.innerHTML=S.createHTML(e),this.modal.classList.add("active"),this.slideshow.startSlideshow(i)}close(){this.modal.classList.remove("active"),this.slideshow.stopSlideshow()}}class d{constructor(){this.cards=document.querySelectorAll(".project-card"),this.MAX_ROTATION=5,this.init()}init(){this.cards.forEach(e=>{e.addEventListener("mousemove",t=>this.handleMouseMove(t,e)),e.addEventListener("mouseleave",t=>this.resetCard(e)),e.addEventListener("mouseenter",()=>this.activateCard(e))})}handleMouseMove(e,t){const i=t.getBoundingClientRect(),s=i.left+i.width/2,r=i.top+i.height/2,a=e.clientX-s,n=(e.clientY-r)/(i.height/2)*this.MAX_ROTATION,h=a/(i.width/2)*-this.MAX_ROTATION;this.updateCardTransform(t,n,h)}updateCardTransform(e,t,i){const s=`
            perspective(1000px)
            rotateX(${t}deg)
            rotateY(${i}deg)
            scale(1.025)
        `;requestAnimationFrame(()=>{e.style.transform=s})}activateCard(e){e.classList.add("hover-active")}resetCard(e){e.classList.remove("hover-active");const t=`
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;requestAnimationFrame(()=>{e.style.transform=t})}}document.addEventListener("DOMContentLoaded",()=>{new d});class g{constructor(){this.cards=document.querySelectorAll(".project-card"),this.maxShift=65,this.hoveredCard=null,this.init()}init(){this.cards.forEach(e=>{e.addEventListener("mouseenter",()=>this.hoveredCard=e),e.addEventListener("mouseleave",()=>{this.hoveredCard=null,this.resetCard(e)})}),window.addEventListener("mousemove",e=>this.handleMouseMove(e))}handleMouseMove(e){if(!this.hoveredCard)return;const t=this.hoveredCard.getBoundingClientRect(),i=t.left+t.width/2,s=t.top+t.height/2,r=e.clientX-i,a=e.clientY-s,l=r/window.innerWidth*this.maxShift,n=a/window.innerHeight*this.maxShift;requestAnimationFrame(()=>{this.hoveredCard.style.transform=`translate(${l}px, ${n}px)`})}resetCard(e){requestAnimationFrame(()=>{e.style.transform="translate(0, 0)"})}}function A(){const o=document.querySelector(".project-grid"),e=new f;o&&(o.innerHTML=c.map(u).join(""),o.querySelectorAll(".project-card").forEach((t,i)=>{t.addEventListener("click",()=>{e.open(c[i])})}),new d,new g)}document.addEventListener("DOMContentLoaded",()=>{m(),A()});
