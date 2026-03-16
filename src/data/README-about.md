# About Section Metadata

This directory contains metadata files for the About section of the portfolio.

## Files

- `about-metadata.json` - **AUTO-GENERATED** from resume parsing (DO NOT EDIT)
- `manual-additions.json` - **MANUAL ADDITIONS** for custom data (EDIT THIS)
- `README-about.md` - This documentation file

## Data Sources & Workflow

### 🔄 Resume Parsing (Auto-Generated)

The `about-metadata.json` file is automatically generated from your resume using the resume parser script:

```bash
pnpm parse-resume
```

**⚠️ Important**: This file should **NEVER** be edited manually as it will be overwritten when you run the parser.

### ✏️ Manual Additions (Custom Data)

The `manual-additions.json` file is for adding data that isn't in your resume or needs customization:

- **Skills** not mentioned in resume (e.g., Vercel, Sentry)
- **Research projects** with different descriptions
- **Additional experience** or education entries
- **Current roles** that should appear before older resume-parsed experience
- **Custom leadership** roles or descriptions

**✅ This is the file you should edit** for manual updates.

### 🔀 Data Merging & Deduplication

The system automatically merges data from both files with smart deduplication:

1. **Skills**: Deduplicated by name, manual additions take priority
2. **Research Projects**: Deduplicated by title, manual additions take priority
3. **Experience/Education/Leadership**: Merged with manual additions taking priority

This ensures no duplicates while allowing you to override auto-generated data.

## Structure

The `about-metadata.json` file contains the following sections:

### Personal Information

```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Professional Title",
    "location": "Your Location",
    "email": "your.email@example.com",
    "linkedin": "https://linkedin.com/in/your-profile",
    "github": "https://github.com/your-username",
    "summary": "Brief professional summary"
  }
}
```

### Skills

```json
{
  "skills": [
    {
      "name": "Skill Name",
      "level": "beginner|intermediate|advanced|expert",
      "category": "frontend|backend|database|devops|tools|ai-ml|soft"
    }
  ]
}
```

**Skill Levels:**

- `beginner` - Gray badge
- `intermediate` - Green badge
- `advanced` - Blue badge
- `expert` - Sakura (pink) badge

**Skill Categories:**

- `frontend` - Frontend technologies (React, TypeScript, etc.)
- `backend` - Backend technologies (Node.js, Python, etc.)
- `database` - Database platforms and storage systems
- `devops` - DevOps tools (Docker, CI/CD, etc.)
- `tools` - Development tools and methodologies
- `ai-ml` - AI tools and copilots used in day-to-day work
- `soft` - Soft skills (Communication, Leadership, etc.)

### Experience

```json
{
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "period": "Start Date - End Date",
      "description": "Brief job description",
      "location": "City, ST",
      "companyUrl": "https://example.com",
      "technologies": ["Tech1", "Tech2", "Tech3"],
      "achievements": ["Achievement 1", "Achievement 2"]
    }
  ]
}
```

### Education

```json
{
  "education": [
    {
      "degree": "Degree Name",
      "institution": "Institution Name",
      "year": "Graduation Year",
      "description": "Additional details (GPA, focus areas, etc.)"
    }
  ]
}
```

### Research Projects

```json
{
  "researchProjects": [
    {
      "title": "Project Title",
      "period": "Project Period",
      "description": "Project description",
      "technologies": ["Tech1", "Tech2"],
      "achievements": ["Achievement 1", "Achievement 2"]
    }
  ]
}
```

### Leadership

```json
{
  "leadership": [
    {
      "name": "Leadership Role Title",
      "organization": "Organization Name",
      "year": "Year or Period",
      "description": "Optional description of responsibilities"
    }
  ]
}
```

## Usage

The About section component automatically loads and merges data from both metadata files. To update the About section:

### For Resume-Based Data:

1. Update your resume in `src/assets/resume.txt`
2. Run `pnpm parse-resume` to regenerate `about-metadata.json`
3. The changes will be reflected immediately in the About section

### For Custom/Manual Data:

1. Edit `manual-additions.json` with your custom information
2. The changes will be reflected immediately in the About section
3. No code changes or parsing required

Manual `experience` entries are rendered before resume-parsed entries, which is useful for adding a current founder role or other recent work that is not in the parsed resume yet.

### Best Practice Workflow:

1. **Major updates**: Update resume → run parser → add manual additions
2. **Quick additions**: Just edit `manual-additions.json`
3. **Skill updates**: Add to `manual-additions.json` (takes priority over resume)

## Data Validation

The metadata is validated using Zod schemas defined in `src/lib/schemas.ts`. Ensure your data matches the expected structure to avoid runtime errors.

## Best Practices

1. **Keep descriptions concise** - Aim for 1-2 sentences for descriptions
2. **Use consistent formatting** - Follow the same format for dates, periods, etc.
3. **Update regularly** - Keep your information current and relevant
4. **Test changes** - Verify the About section displays correctly after updates
5. **Backup data** - Keep a backup of your metadata before making major changes

## Troubleshooting

If the About section doesn't display correctly:

### Data Issues:

1. Check JSON syntax in both `about-metadata.json` and `manual-additions.json`
2. Verify all required fields are present
3. Ensure skill levels and categories use valid values
4. Check for duplicate entries (should be handled automatically)

### File Workflow Issues:

1. **Duplicates showing**: Check if same data exists in both files
2. **Manual changes not showing**: Ensure you're editing `manual-additions.json`, not `about-metadata.json`
3. **Resume changes not reflected**: Run `pnpm parse-resume` after updating resume
4. **Skills missing**: Add to `manual-additions.json` (takes priority over resume)

### Technical Issues:

1. Check the browser console for error messages
2. Run `pnpm type-check` to verify TypeScript types
3. Verify the merging logic in `src/lib/about.ts`
4. Check that both files are properly imported
