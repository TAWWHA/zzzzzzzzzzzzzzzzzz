// Project data array - Contains all project information
export const projects = [
    {
        id: 1,
        title: 'GHEYCHI',
        location: 'TEHRAN, IRAN',
        year: '2017',
        type: 'EVENT',
        tags: ['Music', 'Performance', 'Art'],
        description: 'An experimental music and performance art event.',
        image: 'https://picsum.photos/400/300?1'
    },
    // ... (previous project entries with added tags and descriptions)
];

// Function to create HTML for a single project card
export function createProjectCard(project) {
    const tags = project.tags?.map(tag => `<span class="tag">${tag}</span>`).join('') || '';
    
    return `
        <article class="project-card card-hover">
            <img src="${project.image}" alt="${project.title}" class="image-transition">
            <div class="project-info">
                <div>
                    <h3>${project.title}</h3>
                    <p>${project.year} - ${project.location}</p>
                    <p class="project-type">${project.type}</p>
                    <div class="project-tags">
                        ${tags}
                    </div>
                </div>
            </div>
        </article>
    `;
}