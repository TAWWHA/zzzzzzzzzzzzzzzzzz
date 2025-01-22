/**
 * Main Modal component that combines SlideShow and ProjectInfo
 * 
 * Usage:
 * const modal = new Modal();
 * modal.open(projectData);
 */
import { SlideShow } from './SlideShow.js';
import { ProjectInfo } from './ProjectInfo.js';

export class Modal {
    constructor() {
        this.createModal();
        this.slideshow = new SlideShow();
    }
    
    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">×</button>
                <div id="slideshow-container"></div>
                <div id="project-info-container"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.modal = modal;
        
        this.modal.querySelector('.modal-close').addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
    }
    
    open(project) {
        // Generate demo images
        const demoImages = [
            project.image,
            project.image.replace('?', '?demo2-'),
            project.image.replace('?', '?demo3-')
        ];
        
        // Update slideshow
        const slideshowContainer = this.modal.querySelector('#slideshow-container');
        slideshowContainer.innerHTML = this.slideshow.createSlideShowHTML(demoImages);
        this.slideshow.initializeControls(slideshowContainer);
        
        // Update project info
        const infoContainer = this.modal.querySelector('#project-info-container');
        infoContainer.innerHTML = ProjectInfo.createHTML(project);
        
        // Show modal and start slideshow
        this.modal.classList.add('active');
        this.slideshow.startSlideshow(slideshowContainer);
    }
    
    close() {
        this.modal.classList.remove('active');
        this.slideshow.stopSlideshow();
    }
}