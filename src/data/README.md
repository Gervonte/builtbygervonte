# Projects Metadata

This directory contains the metadata files for the portfolio's work section.

## Files

- `projects-metadata.json` - Main projects data file
- `watch-videos.ts` - Structured Watch video data, types, and helper functions
- `README.md` - This documentation file

## How to Update Projects

To add, edit, or remove projects from the work section:

1. **Edit `projects-metadata.json`** - This is the main data file
2. **Add local images if needed** - Card thumbnails live in `public/images/projects/`
3. **Add modal screenshots if needed** - Technical-details screenshots live in `public/images/technical/`
4. **Restart the dev server** - Run `pnpm dev` to see changes

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
  "imagePath": "project-folder/thumbnail.png",
  "thumbnailPosition": {
    "featured": "center 55%",
    "grid": "center top"
  },
  "thumbnailScale": {
    "featured": 1.1,
    "grid": 1.25
  },
  "achievements": ["Achievement 1", "Achievement 2"],
  "aiTools": ["AI Tool 1", "AI Tool 2"], // Only for vibe-coded projects
  "timeline": "Time period",
  "category": "Category Name",
  "enableTechnicalDetails": true,
  "technicalDetails": {
    "product": {
      "description": "Short summary for the modal overview",
      "tools": ["Tool 1", "Tool 2"],
      "screenshots": [
        {
          "src": "project-folder/screen-1.png",
          "caption": "Screenshot caption",
          "alt": "Accessible alt text"
        }
      ]
    }
  }
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

## Image Storage

- `public/images/projects/` - Card and featured thumbnails referenced by `imagePath`
- `public/images/technical/` - Technical-details modal screenshots referenced by `technicalDetails.*.screenshots`

Nested folders are supported for both.

## Utility Functions

The `src/lib/projects.ts` file provides utility functions to work with the projects data:

- `getProjectsByType(type)` - Get projects by type
- `getFeaturedProjects()` - Get featured projects
- `getProjectById(id)` - Get specific project
- `getProjectStats()` - Get project statistics

## Watch Video Data

Watch videos live in `watch-videos.ts` as TypeScript data because the Watch section needs
literal collection/status types and small helper functions. Coming-soon videos should omit
`youtubeUrl` and `youtubeId` until real YouTube links are available; do not use placeholder or
empty-string URLs.

## Example: Adding a New Project

1. Open `projects-metadata.json`
2. Add any thumbnail image to `public/images/projects/`
3. Add any modal screenshots to `public/images/technical/` if the project uses technical details
4. Add a new project object to the `projects` array
5. Save the file
6. Restart the dev server with `pnpm dev`
7. The new project will appear in the work section

## Example: Updating Project Information

1. Find the project by `id` in `projects-metadata.json`
2. Update any fields you want to change
3. Save the file
4. Restart the dev server with `pnpm dev`
5. Changes will be reflected in the work section
