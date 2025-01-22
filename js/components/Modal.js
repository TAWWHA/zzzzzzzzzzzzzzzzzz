// Modal component for project details
export class ProjectModal {
    constructor() {
        this.createModal();
        this.currentSlide = 0;
        this.slideInterval = null;
        this.normalInterval = 5000; // 5 seconds
        this.manualInterval = 10000; // 10 seconds
        this.isManualScroll = false;
        this.isAnimating = false;
    }
    
    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">×</button>
                <div class="slideshow">
                    <div class="slideshow-container"></div>
                    <button class="slide-nav-button slide-nav-prev" aria-label="Previous slide">←</button>
                    <button class="slide-nav-button slide-nav-next" aria-label="Next slide">→</button>
                    <div class="slide-nav"></div>
                </div>
                <div class="modal-info"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.modal = modal;
        
        // Add event listeners
        this.modal.querySelector('.modal-close').addEventListener('click', () => this.close());
        this.modal.querySelector('.slide-nav-prev').addEventListener('click', () => this.prevSlide(true));
        this.modal.querySelector('.slide-nav-next').addEventListener('click', () => this.nextSlide(true));
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
    }
    
    prevSlide(isManual = false) {
        if (this.isAnimating) return;
        const newIndex = (this.currentSlide - 1 + 3) % 3;
        this.goToSlide(newIndex, isManual);
    }
    
    nextSlide(isManual = false) {
        if (this.isAnimating) return;
        const newIndex = (this.currentSlide + 1) % 3;
        this.goToSlide(newIndex, isManual);
    }
    
    open(project) {
        // Generate demo images (in real project, these would come from project data)
        const demoImages = [
            project.image,
            project.image.replace('?', '?demo2-'),
            project.image.replace('?', '?demo3-')
        ];
        
        // Update slideshow
        const slideshow = this.modal.querySelector('.slideshow-container');
        slideshow.innerHTML = demoImages.map(img => `
            <div class="slide">
                <img src="${img}" alt="Project image">
            </div>
        `).join('');
        
        // Update navigation dots
        const nav = this.modal.querySelector('.slide-nav');
        nav.innerHTML = demoImages.map((_, i) => `
            <div class="slide-dot${i === 0 ? ' active' : ''}" data-index="${i}"></div>
        `).join('');
        
        // Add click handlers to dots
        nav.querySelectorAll('.slide-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                if (!this.isAnimating) {
                    this.goToSlide(parseInt(dot.dataset.index), true);
                }
            });
        });
        
        // Update project info
        this.modal.querySelector('.modal-info').innerHTML = `
            <h2>${project.title}</h2>
            <div class="meta">
                <span>${project.year}</span>
                <span>${project.location}</span>
                <span>${project.type}</span>
            </div>
            <div class="description">
                <p>${project.description}</p>
                <p>Additional context and information about the project goes here. This section can be expanded with more detailed content specific to each project.</p>
            </div>
        `;
        
        // Show modal
        this.modal.classList.add('active');
        
        // Start slideshow
        this.startSlideshow();
    }
    
    close() {
        this.modal.classList.remove('active');
        this.stopSlideshow();
    }
    
    goToSlide(index, isManual = false) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const slideshow = this.modal.querySelector('.slideshow-container');
        const dots = this.modal.querySelectorAll('.slide-dot');
        
        this.currentSlide = index;
        slideshow.style.transform = `translateX(-${index * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 800); // Match the CSS transition duration

        // Handle manual interaction
        if (isManual) {
            this.isManualScroll = true;
            this.restartSlideshow();
        }
    }
    
    startSlideshow() {
        this.stopSlideshow();
        this.slideInterval = setInterval(() => {
            if (!this.isAnimating) {
                const nextSlide = (this.currentSlide + 1) % 3;
                this.goToSlide(nextSlide);
            }
        }, this.normalInterval);
    }
    
    restartSlideshow() {
        this.stopSlideshow();
        // Use longer interval for manual interaction
        this.slideInterval = setInterval(() => {
            if (!this.isAnimating) {
                this.isManualScroll = false; // Reset manual flag
                this.startSlideshow(); // Return to normal interval
                const nextSlide = (this.currentSlide + 1) % 3;
                this.goToSlide(nextSlide);
            }
        }, this.manualInterval);
    }
    
    stopSlideshow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}