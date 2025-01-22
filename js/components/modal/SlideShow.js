/**
 * Handles the slideshow functionality within the modal
 * 
 * Configuration:
 * - normalInterval: Time between automatic slides (default: 5000ms)
 * - manualInterval: Time after manual interaction (default: 10000ms)
 */
export class SlideShow {
    constructor() {
        this.currentSlide = 0;
        this.slideInterval = null;
        this.normalInterval = 5000; // 5 seconds
        this.manualInterval = 10000; // 10 seconds
        this.isManualScroll = false;
    }

    createSlideShowHTML(images) {
        return `
            <div class="slideshow">
                <div class="slideshow-container">
                    ${images.map((img, index) => `
                        <div class="slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                            <img src="${img}" alt="Project image">
                        </div>
                    `).join('')}
                </div>
                <button class="slide-nav-button slide-nav-prev" aria-label="Previous slide">←</button>
                <button class="slide-nav-button slide-nav-next" aria-label="Next slide">→</button>
                <div class="slide-nav">
                    ${images.map((_, i) => `
                        <button class="slide-dot${i === 0 ? ' active' : ''}" data-index="${i}"></button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    initializeControls(container) {
        const slideshow = container.querySelector('.slideshow');
        slideshow.querySelector('.slide-nav-prev').addEventListener('click', () => this.prevSlide(slideshow, true));
        slideshow.querySelector('.slide-nav-next').addEventListener('click', () => this.nextSlide(slideshow, true));
        
        slideshow.querySelectorAll('.slide-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                this.goToSlide(parseInt(dot.dataset.index, 10), slideshow, true);
            });
        });
    }

    prevSlide(container, isManual) {
        const newIndex = (this.currentSlide - 1 + 3) % 3;
        this.goToSlide(newIndex, container, isManual);
    }

    nextSlide(container, isManual) {
        const newIndex = (this.currentSlide + 1) % 3;
        this.goToSlide(newIndex, container, isManual);
    }

    goToSlide(index, container, isManual) {
        const slides = container.querySelectorAll('.slide');
        const dots = container.querySelectorAll('.slide-dot');
        
        // Remove active class from current slide and dot
        slides[this.currentSlide].classList.remove('active');
        dots[this.currentSlide].classList.remove('active');
        
        // Add active class to new slide and dot
        this.currentSlide = index;
        slides[this.currentSlide].classList.add('active');
        dots[this.currentSlide].classList.add('active');

        if (isManual) {
            this.isManualScroll = true;
            this.restartSlideshow(container);
        }
    }

    startSlideshow(container) {
        this.stopSlideshow();
        const slideshow = container.querySelector('.slideshow');
        this.slideInterval = setInterval(() => {
            const nextSlide = (this.currentSlide + 1) % 3;
            this.goToSlide(nextSlide, slideshow, false);
        }, this.normalInterval);
    }

    restartSlideshow(container) {
        this.stopSlideshow();
        const slideshow = container.querySelector('.slideshow');
        this.slideInterval = setInterval(() => {
            this.isManualScroll = false;
            this.startSlideshow(container);
            const nextSlide = (this.currentSlide + 1) % 3;
            this.goToSlide(nextSlide, slideshow, false);
        }, this.manualInterval);
    }

    stopSlideshow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}