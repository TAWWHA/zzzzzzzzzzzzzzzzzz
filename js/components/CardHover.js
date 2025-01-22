/**
 * Enhanced 3D Card Hover Effect with Reversed Perspective
 * Implements perspective-correct 3D rotation based on cursor position
 */
export class CardHover {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.MAX_ROTATION = 5; // Reduced from 15 to 7.5 (50% less)
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', e => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', e => this.resetCard(card));
            card.addEventListener('mouseenter', () => this.activateCard(card));
        });
    }
    
    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        
        // Calculate cursor position relative to card center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate rotation angles based on cursor distance from center
        // Multiply by positive value to reverse the effect
        const rotateX = (mouseY / (rect.height / 2)) * this.MAX_ROTATION;
        const rotateY = (mouseX / (rect.width / 2)) * -this.MAX_ROTATION;
        
        // Apply the transform with perspective
        this.updateCardTransform(card, rotateX, rotateY);
    }
    
    updateCardTransform(card, rotateX, rotateY) {
        // Construct transform with perspective and scale
        const transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.025)
        `;
        
        requestAnimationFrame(() => {
            card.style.transform = transform;
        });
    }
    
    activateCard(card) {
        card.classList.add('hover-active');
    }
    
    resetCard(card) {
        card.classList.remove('hover-active');
        
        // Reset to initial state with smooth transition
        const transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;
        
        requestAnimationFrame(() => {
            card.style.transform = transform;
        });
    }
}

// Initialize hover effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CardHover();
});