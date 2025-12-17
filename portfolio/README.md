# Portfolio Index

This directory contains the portfolio index that lists all GitHub repositories and projects.

## Structure

- `index.html` - Main portfolio index page with categorized repository listings

## How to Use

1. **Add New Repositories**: Edit `index.html` and add repository cards to the appropriate section
2. **Categories Available**:
   - Featured Projects
   - Tools & Utilities
   - Tech Stack Implementations
   - Framework Examples
   - Learning & Experiments
   - All Other Projects

## Repository Card Template

```html
<div class="repo-card">
    <h3><a href="GITHUB_URL" target="_blank">repository-name</a></h3>
    <p class="repo-description">Brief description of the repository.</p>
    <div class="repo-meta">
        <span>📝 Language/Type</span>
        <span>⭐ Tags</span>
    </div>
</div>
```

## Maintenance

- Keep the portfolio index updated as new repositories are created
- Organize repositories by their primary purpose or technology
- Use clear, concise descriptions for each repository
