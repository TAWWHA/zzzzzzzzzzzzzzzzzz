// Component for rendering individual project cards
export function createProjectCard(project) {
    return `
        <article class="project-card card-hover">
            <div class="project-card-image">
                <img src="${project.image}" alt="${project.title}" class="image-transition">
            </div>
            <div class="project-info">
                <div>
                    <h3>${project.title}</h3>
                    <p class="project-meta">${project.year} - ${project.location} • <span class="project-type">${project.type}</span></p>
                    <p class="project-description">${project.description}</p>
                </div>
            </div>
        </article>
    `;
}