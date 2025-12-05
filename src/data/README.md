# Projects Metadata

This directory contains the metadata files for the portfolio's work section.

## Files

- `projects-metadata.json` - Main projects data file
- `README.md` - This documentation file

## How to Update Projects

To add, edit, or remove projects from the work section:

1. **Edit `projects-metadata.json`** - This is the main data file
2. **No code changes needed** - The WorkSection component automatically reads from this file
3. **Restart the dev server** - Run `npm run dev` to see changes

## Project Structure

Each project in the `projects` array should have:

```json
{
  "id": "unique-project-id",
  "title": "Project Name",
  "description": "Short description",
  "longDescription": "Detailed description",
  "type": "vibe-coded" | "standard-work",
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "status": "live" | "in-progress" | "planned",
  "featured": true | false,
  "liveUrl": "https://example.com",
  "githubUrl": "https://github.com/user/repo",
  "achievements": ["Achievement 1", "Achievement 2"],
  "aiTools": ["AI Tool 1", "AI Tool 2"], // Only for vibe-coded projects
  "timeline": "Time period",
  "category": "Category Name"
}
```

## Project Types

- **vibe-coded**: AI-assisted development projects
- **standard-work**: Traditional development projects

## Status Options

- **live**: Finished projects
- **in-progress**: Currently working on
- **planned**: Future projects

## Categories

You can create any category names you want. Common examples:

- Full Stack Web Development
- AI/ML Research
- Fintech Development
- Frontend Development
- DevOps & Infrastructure

## Philosophy Section

The philosophy section is also configurable in the metadata file under the `philosophy` object.

## Utility Functions

The `src/lib/projects.ts` file provides utility functions to work with the projects data:

- `getProjectsByType(type)` - Get projects by type
- `getFeaturedProjects()` - Get featured projects
- `getProjectById(id)` - Get specific project
- `getProjectStats()` - Get project statistics

## Example: Adding a New Project

1. Open `projects-metadata.json`
2. Add a new project object to the `projects` array
3. Save the file
4. Restart the dev server
5. The new project will appear in the work section

## Example: Updating Project Information

1. Find the project by `id` in `projects-metadata.json`
2. Update any fields you want to change
3. Save the file
4. Restart the dev server
5. Changes will be reflected in the work section
