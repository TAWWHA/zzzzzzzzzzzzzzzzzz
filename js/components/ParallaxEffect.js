/**
 * Handles parallax effect for project cards
 * Adds subtle movement that follows the mouse position only on hover
 */
export class ParallaxEffect {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.maxShift = 65; // Maximum pixel shift
        this.hoveredCard = null;
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.hoveredCard = card);
            card.addEventListener('mouseleave', () => {
                this.hoveredCard = null;
                this.resetCard(card);
            });
        });
        
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    handleMouseMove(e) {
        if (!this.hoveredCard) return;

        const rect = this.hoveredCard.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        // Calculate distance from mouse to card center
        const distanceX = e.clientX - cardCenterX;
        const distanceY = e.clientY - cardCenterY;

        // Calculate shift based on distance (inverse relationship)
        const shiftX = (distanceX / window.innerWidth) * this.maxShift;
        const shiftY = (distanceY / window.innerHeight) * this.maxShift;

        // Apply transform with smooth transition
        requestAnimationFrame(() => {
            this.hoveredCard.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
        });
    }

    resetCard(card) {
        requestAnimationFrame(() => {
            card.style.transform = 'translate(0, 0)';
        });
    }
}