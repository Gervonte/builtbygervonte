# Portfolio AI

A modern, AI-assisted portfolio website built with Next.js, TypeScript, and Mantine UI, featuring a beautiful sakura theme inspired by mono no aware aesthetics.

## ✨ Features

- **AI-Assisted Development**: Built with Claude AI, GitHub Copilot, and ChatGPT
- **Modern Tech Stack**: Next.js 15+, TypeScript, Mantine UI
- **Beautiful Animations**: Custom sakura petal effects with sakura.js
- **Responsive Design**: Mobile-first approach with Mantine components
- **Dynamic Screenshots**: Automatic project thumbnails with fallback system
- **Data Validation**: Comprehensive schemas with Zod
- **Performance Optimized**: 26% smaller bundle, lazy loading, and optimized images
- **CI/CD Pipeline**: Automated testing, building, and deployment with GitHub Actions
- **Security Scanning**: Automated vulnerability detection and dependency updates
- **Performance Monitoring**: Lighthouse CI with Core Web Vitals tracking

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔄 CI/CD Pipeline

This project includes comprehensive GitHub Actions workflows:

- **Automated Testing**: Lint, type-check, and build verification
- **Security Scanning**: Vulnerability detection and dependency review
- **Performance Monitoring**: Lighthouse CI with Core Web Vitals tracking
- **Pull Request Automation**: Auto-create PRs from preview branch with review process
- **Auto Deployment**: Deploy to Vercel on push to main/preview branches
- **Dependency Updates**: Weekly automated dependency updates

### 🚀 Pull Request Automation Workflow

The project uses a multi-stage PR workflow for safe deployments:

1. **Create Feature Branch** (linked to GitHub issue):

   ```bash
   git checkout -b feature/issue-123-add-new-feature
   # Make your changes
   git add .
   git commit -m "Add new feature (closes #123)"
   git push origin feature/issue-123-add-new-feature
   ```

2. **PR to Preview**: Create PR from feature branch → preview branch
3. **Review & Test**: Review changes and test on preview deployment
4. **Merge to Preview**: Approved PRs merge to preview branch
5. **Auto-Create Production PR**: GitHub automatically creates PR from preview → main
6. **Review & Approve**: Review the preview changes and approve the PR
7. **Auto-Merge**: Approved PRs are automatically merged to main
8. **Auto-Deploy**: Vercel automatically deploys the main branch

### Setup GitHub Actions

1. **Get Vercel credentials**:

   ```bash
   ./scripts/setup-vercel.sh
   ```

2. **Add GitHub Secrets**:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel team ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

3. **Create Preview Branch**:

   ```bash
   git checkout -b preview
   git push origin preview
   ```

4. **Development Workflow**:

   ```bash
   # Create feature branch linked to GitHub issue
   git checkout -b feature/issue-123-add-new-feature

   # Make changes and push
   git add .
   git commit -m "Add new feature (closes #123)"
   git push origin feature/issue-123-add-new-feature

   # Create PR: feature-branch → preview
   # After approval, preview → main happens automatically
   ```

See [.github/GITHUB_ACTIONS.md](.github/GITHUB_ACTIONS.md) for detailed setup instructions.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
├── lib/                # Utility functions
├── data/               # Project metadata
├── styles/             # Global styles
└── types/              # TypeScript definitions

public/
├── images/
│   └── projects/       # Local project images
└── js/                 # Third-party scripts
```

## 🖼️ Project Images

The portfolio supports multiple image sources with automatic fallback:

1. **Local Images** (Priority 1): Place images in `/public/images/projects/`
2. **Live Screenshots** (Priority 2): Automatic screenshots from live URLs
3. **Generated Placeholders** (Priority 3): SVG placeholders as final fallback

### Adding Project Images

1. Add your image to `/public/images/projects/`
2. Update the project in `src/data/projects-metadata.json`:
   ```json
   {
     "id": "my-project",
     "title": "My Project",
     "imagePath": "my-project.png",
     "liveUrl": "https://my-project.vercel.app"
   }
   ```

## 🎨 Design System

- **Color Palette**: Sakura pink, warm neutrals, earth tones
- **Typography**: Modern, readable fonts
- **Animations**: Smooth transitions and sakura petal effects
- **Layout**: Clean, minimalist design with focus on content

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier

### Code Quality

- **ESLint**: Code linting with Next.js and TypeScript rules
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **TypeScript**: Full type safety

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🚀 Deployment

The project is optimized for Vercel deployment with:

- Automatic builds from GitHub
- Edge functions for API routes
- Image optimization
- CDN distribution

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Contact

- **Portfolio**: [portfolio-ai-xi.vercel.app](https://portfolio-ai-xi.vercel.app)
- **GitHub**: [@gervonte](https://github.com/gervonte)
- **Email**: [Your Email]

---

Built with ❤️ and AI assistance
