# BuiltByGervonte - AI-Assisted Portfolio

Built with Next.js, TypeScript, and Mantine UI, featuring a beautiful sakura theme inspired by mono no aware aesthetics and an ocean theme inspired by my home country 🇧🇸.

## 💡 Why This Project Matters

This portfolio isn’t just a website. It’s a fully engineered production-grade system built to:

- showcase modern React/Next.js best practices
- demonstrate TypeScript-first design
- prove CI/CD proficiency
- highlight clean UI/UX implementation
- show ability to ship polished, complete software

It represents the engineering quality I bring to every product I build.

## 🧰 Tech Stack

- Next.js 15 • React Server Components • TypeScript (strict)
- Mantine UI • Zod • ESLint/Prettier • Husky
- GitHub Actions • Vercel • Lighthouse CI

## ✨ Features

- **AI-assisted development workflow** (Copilot, Claude, ChatGPT)
- **Production-grade Next.js 15 architecture**
- **Strong TypeScript discipline with full type safety**
- **Performance optimized** (26% smaller bundle + smart code splitting)
- **CI/CD pipeline** with automated testing + security scanning
- **Dynamic asset generation** for project thumbnails
- **Design system powered by Mantine**

### 🤔 What is Mono no Aware?

> **Mono no aware (物の哀れ)** is a Japanese aesthetic concept meaning:
> **“the gentle sadness or deep appreciation that comes from recognizing the impermanence of things.”**
>
> In this portfolio, it reflects my story. Living life in seasons, appreciating temporary chapters, and finding beauty in the transitions that shaped who I am today!

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

1. **Create Feature Branch** (linked to GitHub issue)
2. **PR to Preview**: Create PR from feature branch → preview branch
3. **Review & Test**: Review changes and test on preview deployment
4. **Squash Merge to Preview**: Approved PRs merge to preview branch
5. **Auto-Create Production PR**: GitHub automatically creates PR from preview → main
6. **Review & Approve**: Review the preview changes and approve the PR
7. **Auto-Merge**: Approved PRs are automatically merged to main the next day at 9:00 AM EST
8. **Auto-Deploy**: Vercel automatically deploys the main branch

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

## 🎨 Design System

- **Color Palette**: Sakura pink/red, Ocean blue, warm neutrals, earth tones
- **Typography**: Modern, readable fonts
- **Animations**: Smooth transitions and sakura petal effects
- **Layout**: Clean, minimalist design with focus on content

## 🛠️ Development

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

## 📞 Contact

- **Portfolio**: [Visit BuiltByGervonte.com](https://builtbygervonte.com/)
- **GitHub**: [@gervonte](https://github.com/gervonte)
- **Email**: [hello@builtbygervonte.com](mailto:hello@builtbygervonte.com)

---

Built with care, clarity, and craftsmanship.
