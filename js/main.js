import { projects } from './data/projects.js';
import { createProjectCard } from './components/ProjectCard.js';
import { initCursor } from './components/Cursor.js';
import { Modal } from './components/modal/Modal.js';
import { CardHover } from './components/CardHover.js';
import { ParallaxEffect } from './components/ParallaxEffect.js';

// Initialize project grid
function initializeProjects() {
    const projectGrid = document.querySelector('.project-grid');
    const modal = new Modal();
    
    if (projectGrid) {
        projectGrid.innerHTML = projects.map(createProjectCard).join('');
        
        // Add click handlers to project cards
        projectGrid.querySelectorAll('.project-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                modal.open(projects[index]);
            });
        });

        // Initialize card hover effects
        new CardHover();
        
        // Initialize parallax effect
        new ParallaxEffect();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initializeProjects();
});