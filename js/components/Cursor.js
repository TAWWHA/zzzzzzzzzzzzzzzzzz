// Custom cursor implementation
export class Cursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        
        // Bind methods
        this.onMouseMove = this.onMouseMove.bind(this);
        this.init();
    }
    
    init() {
        // Track cursor movement
        document.addEventListener('mousemove', this.onMouseMove);
    }
    
    onMouseMove(e) {
        // Update cursor position with smooth animation
        requestAnimationFrame(() => {
            this.cursor.style.left = `${e.clientX}px`;
            this.cursor.style.top = `${e.clientY}px`;
        });
    }
}

// Initialize cursor
export function initCursor() {
    // Only initialize cursor on desktop
    if (!window.matchMedia("(max-width: 768px)").matches) {
        new Cursor();
    }
}