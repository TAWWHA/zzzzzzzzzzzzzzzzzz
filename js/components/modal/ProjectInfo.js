/**
 * Handles the project information display in the modal
 * 
 * Usage:
 * Import this component to display project details
 * Customize the layout by modifying the template
 */
export class ProjectInfo {
    /**
     * Creates project info HTML structure
     * @param {Object} project - Project data object
     * @returns {string} HTML string
     */
    static createHTML(project) {
        return `
            <div class="modal-info">
                <h2>${project.title}</h2>
                <div class="meta">
                    <span>${project.year}</span>
                    <span>${project.location}</span>
                    <span>${project.type}</span>
                </div>
                <div class="description">
                    <p>${project.description}</p>
                    <p>Additional context and information about the project goes here. 
                       This section can be expanded with more detailed content specific to each project.</p>
                </div>
            </div>
        `;
    }
}