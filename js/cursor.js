document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Mouse movement handler
    const moveCursor = (e) => {
        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;
        cursor.style.transform = `translate(${x}px, ${y}px)`;
    };

    // Touch movement handler
    const handleTouchMove = (e) => {
        e.preventDefault();
        moveCursor(e);
    };

    // Event listeners for mobile
    if (matchMedia('(max-width: 768px)').matches) {
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('mousemove', moveCursor);
    }
});