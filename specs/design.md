# Portfolio Design Document

## Design Philosophy

### Core Design Principles

- **Mono No Aware**: Embracing the beauty of transience and impermanence through delicate, fleeting visual elements
- **Cherry Blossom Aesthetic**: Soft, organic design inspired by sakura petals and spring renewal
- **Professional Elegance**: Clean, sophisticated design that conveys competence while maintaining warmth
- **Card-Based Interactivity**: All interactive elements encased in consistent card containers for unified user experience
- **Living Interface**: Non-text elements respond to user interaction with hover effects, bringing the page to life
- **Subtle Animation**: Gentle, contemplative movements that reflect the ephemeral nature of beauty
- **Accessibility First**: Inclusive design that works for all users
- **Performance-Driven**: Visual choices that support fast loading and smooth interactions
- **Brand Consistency**: Cohesive visual language throughout all sections

### Target Audience

- **Primary**: Hiring managers and technical leads
- **Secondary**: Recruiters and HR professionals
- **Tertiary**: Fellow developers and industry peers

## Design System Foundation

### Mantine UI Integration

- **Component Library**: Mantine UI for consistent, accessible components
- **Theme System**: Dynamic theme system with sakura and ocean variants
- **Typography**: Mantine's typography system with custom font configurations
- **Spacing**: Mantine's spacing scale adapted for cherry blossom aesthetic
- **Accessibility**: Built-in accessibility features from Mantine components

### Dynamic Theme System

The portfolio now features a comprehensive theme system that allows users to switch between two distinct visual experiences:

#### Theme Architecture

- **Theme-Aware Hooks**: Custom React hooks for dynamic color access
- **Context-Based Switching**: React Context for theme state management
- **Component Integration**: All components automatically adapt to current theme
- **Fallback System**: Sakura theme as default with graceful degradation

#### Theme Variants

1. **Sakura Theme (Default)**: Cherry blossom aesthetic with warm reds and pinks
2. **Ocean Theme (Alternative)**: Ocean mist aesthetic with cool teals and aquas

#### Theme Switching

- **Palette Toggle**: User-friendly sakura/ocean switcher in the header
- **Appearance Toggle**: Single-button `Auto / Light / Dark` control next to the palette toggle
- **Persistent State**: Palette and appearance preferences saved in localStorage
- **Smooth Transitions**: Seamless switching between themes
- **System Integration**: `Auto` respects the user's system theme preference

### Design Tokens

- **Colors**: Dynamic theme-aware color system with sakura and ocean palettes
- **Typography**: Mantine font families with custom sizing
- **Spacing**: Mantine spacing scale (4px base unit)
- **Shadows**: Theme-aware shadow system for depth and elevation
- **Border Radius**: Consistent border radius values
- **Breakpoints**: Mantine responsive breakpoints
- **Gradients**: Dynamic gradient system that adapts to current theme
- **Effects**: Theme-aware visual effects (sakura petals, ocean mist)

## Visual Identity

### Color Palette

#### Current Palette: Cherry Blossom Inspired (Red Variant)

- **Sakura Red**: `#FFCDD2` - Soft, delicate red for primary elements
- **Sakura Deep**: `#F44336` - Deeper red for emphasis and CTAs
- **Sakura Light**: `#FFEBEE` - Very light red for backgrounds and highlights
- **Sakura Accent**: `#EF9A9A` - Medium red for secondary elements

#### Alternative Palette: Ocean Mist (Blue-Green Variant)

- **Ocean Mist**: `#B8E6E6` - Soft, ethereal blue-green for primary elements
- **Ocean Deep**: `#0891B2` - Deeper teal for emphasis and CTAs
- **Ocean Light**: `#F0FDFA` - Very light aqua for backgrounds and highlights
- **Ocean Accent**: `#67E8F9` - Medium cyan for secondary elements

_This alternative maintains the same delicate, transient beauty while evoking the calm, contemplative nature of ocean mist - perfect for the Mono No Aware philosophy._

#### Neutral Colors (Consistent Across Themes)

- **Warm White**: `#FEFEFE` - Pure, clean white for main backgrounds
- **Soft Gray**: `#F5F5F5` - Gentle gray for section backgrounds
- **Charcoal**: `#2C2C2C` - Deep charcoal for primary text
- **Midnight**: `#1A1A1A` - Near black for strong contrast
- **Text Secondary**: `#666666` - Medium gray for supporting text
- **Text Muted**: `#999999` - Light gray for placeholders and subtle text
- **Background Cream**: `#FDFCFB` - Warm off-white for section backgrounds
- **Border Light**: `#E8E8E8` - Subtle borders and dividers

#### Work Section Specific Colors

- **Vibe Coded Accent**: `#F44336` - Deep sakura red for AI-assisted work
- **Standard Work Accent**: `#8B4513` - Warm brown for traditional development
- **Vibe Coded Background**: `#FFEBEE` with sakura red tint
- **Standard Work Background**: `#FDF4E3` with warm brown tint

#### Sakura Petal Colors (Sakura Theme)

- **Petal Red**: `#FFCDD2` - Main petal color
- **Petal Light**: `#FFEBEE` - Light petal for subtle effects
- **Petal Dark**: `#F44336` - Dark petal for depth and shadow

#### Ocean Mist Effects (Ocean Theme)

- **Mist Droplet**: `#B8E6E6` - Main droplet color
- **Mist Light**: `#F0FDFA` - Light droplet for subtle effects
- **Mist Dark**: `#0891B2` - Dark droplet for depth and shadow

### Theme-Aware Color System

The portfolio implements a sophisticated theme-aware color system that provides dynamic color access across all components:

#### Color Hooks

- **useColorCombinations()**: Provides theme-specific gradient combinations
- **useCommonColors()**: Supplies semantic color tokens (text, background, borders)
- **usePrimaryColors()**: Returns the primary color palette for current theme
- **useEffectColors()**: Provides effect colors (pink for sakura, mist for ocean)
- **useWarmColors()**: Supplies neutral warm colors (consistent across themes)

#### Theme Color Consistency (Updated)

- **Hardcoded Color Elimination**: All hardcoded hex values replaced with theme color references
- **Component Color Usage**:
  - `Header.tsx`: Uses `warmColors` for background and `withOpacity` for transparency
  - `OptimizedLoadingSpinner.tsx`: Theme-aware skeleton gradients for light and dark modes
  - `colors.ts`: Gradient definitions use theme colors (`sakura[0]`, `warm[1]`, etc.)
- **UnifiedCard Subtitle Styling**: New `subtitleColor` prop allows flexible color overrides
- **Fallback System**: All theme colors include fallback hex values for graceful degradation
- **useEarthColors()**: Provides earth tones (consistent across themes)

#### Semantic Color Mapping

| Purpose            | Sakura Theme          | Ocean Theme          | Description         |
| ------------------ | --------------------- | -------------------- | ------------------- |
| **Primary**        | `sakura[3]` (#F44336) | `ocean[3]` (#0891B2) | Main brand color    |
| **Effect**         | `pink[3]` (#F06292)   | `mist[3]` (#5EEAD4)  | Accent/effect color |
| **Text Primary**   | `warm[5]` (#2C2C2C)   | `warm[5]` (#2C2C2C)  | Main text color     |
| **Text Secondary** | `warm[4]` (#666666)   | `warm[4]` (#666666)  | Secondary text      |
| **Background**     | `warm[0]` (#FDFCFB)   | `warm[0]` (#FDFCFB)  | Main background     |

#### Gradient System

- **Primary Gradient**: `linear-gradient(135deg, primary[3], primary[1])`
- **Effect Gradient**: `linear-gradient(135deg, effect[3], effect[1])`
- **Footer Gradient**: `linear-gradient(135deg, primary[0], warm[1])`
- **Modal Gradients**: Theme-specific gradients for technical details

### Mantine Theme Configuration

#### Current Theme: Sakura (Cherry Blossom)

```typescript
// Mantine theme with sakura color palette
const sakuraTheme = {
  colors: {
    sakura: [
      '#FFEBEE', // sakura[0] - lightest red
      '#FFCDD2', // sakura[1] - light red
      '#EF9A9A', // sakura[2] - medium red
      '#F44336', // sakura[3] - deep red
      '#E53935', // sakura[4] - darker red
      '#D32F2F', // sakura[5] - darkest red
      '#C62828', // sakura[6] - very dark red
      '#B71C1C', // sakura[7] - ultra dark red
      '#8D1A1A', // sakura[8] - near black red
      '#4A0E0E', // sakura[9] - black red
    ],
    warm: [
      '#FDFCFB', // warm[0] - cream white
      '#F5F5F5', // warm[1] - light gray
      '#E8E8E8', // warm[2] - border gray
      '#999999', // warm[3] - muted text
      '#666666', // warm[4] - secondary text
      '#2C2C2C', // warm[5] - primary text
      '#1A1A1A', // warm[6] - near black
      '#1A1A1A', // warm[7] - duplicate for 10 elements
      '#1A1A1A', // warm[8] - duplicate for 10 elements
      '#1A1A1A', // warm[9] - duplicate for 10 elements
    ],
    earth: [
      '#FDF4E3', // earth[0] - light brown
      '#F4E4BC', // earth[1] - warm beige
      '#D4A574', // earth[2] - medium brown
      '#8B4513', // earth[3] - saddle brown
      '#654321', // earth[4] - dark brown
      '#4A2C17', // earth[5] - darker brown
      '#3D2314', // earth[6] - very dark brown
      '#2F1B0F', // earth[7] - ultra dark brown
      '#1F1209', // earth[8] - near black brown
      '#0F0905', // earth[9] - black brown
    ],
    // Pink colors for sakura effects
    pink: [
      '#FCE4EC', // pink[0] - lightest pink
      '#F8BBD9', // pink[1] - light pink
      '#F48FB1', // pink[2] - medium pink
      '#F06292', // pink[3] - deep pink
      '#EC407A', // pink[4] - darker pink
      '#E91E63', // pink[5] - darkest pink
      '#D81B60', // pink[6] - very dark pink
      '#C2185B', // pink[7] - ultra dark pink
      '#AD1457', // pink[8] - near black pink
      '#880E4F', // pink[9] - black pink
    ],
  },
  primaryColor: 'sakura',
  primaryShade: 3, // Use sakura[3] as primary
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, Fira Code, Consolas, monospace',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
  components: {
    Tooltip: {
      defaultProps: {
        multiline: true,
        withArrow: true,
        withinPortal: true,
        zIndex: 1000,
      },
      styles: {
        tooltip: {
          fontSize: '14px',
          maxWidth: '280px',
          padding: '8px 12px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
        },
        arrow: {
          zIndex: 1001,
        },
      },
    },
    ActionIcon: {
      styles: {
        root: {
          // Ensure minimum touch target size on mobile
          minHeight: '44px',
          minWidth: '44px',
        },
      },
    },
  },
};
```

#### Alternative Theme: Ocean Mist

```typescript
// Mantine theme with ocean mist color palette
const oceanTheme = {
  colors: {
    ocean: [
      '#F0FDFA', // ocean[0] - lightest aqua
      '#B8E6E6', // ocean[1] - light aqua
      '#67E8F9', // ocean[2] - medium cyan
      '#0891B2', // ocean[3] - deep teal
      '#0E7490', // ocean[4] - darker teal
      '#155E75', // ocean[5] - darkest teal
      '#164E63', // ocean[6] - very dark teal
      '#134E4A', // ocean[7] - ultra dark teal
      '#0F766E', // ocean[8] - near black teal
      '#0A4A42', // ocean[9] - black teal
    ],
    warm: [
      '#FDFCFB', // warm[0] - cream white
      '#F5F5F5', // warm[1] - light gray
      '#E8E8E8', // warm[2] - border gray
      '#999999', // warm[3] - muted text
      '#666666', // warm[4] - secondary text
      '#2C2C2C', // warm[5] - primary text
      '#1A1A1A', // warm[6] - near black
      '#1A1A1A', // warm[7] - duplicate for 10 elements
      '#1A1A1A', // warm[8] - duplicate for 10 elements
      '#1A1A1A', // warm[9] - duplicate for 10 elements
    ],
    earth: [
      '#FDF4E3', // earth[0] - light brown
      '#F4E4BC', // earth[1] - warm beige
      '#D4A574', // earth[2] - medium brown
      '#8B4513', // earth[3] - saddle brown
      '#654321', // earth[4] - dark brown
      '#4A2C17', // earth[5] - darker brown
      '#3D2314', // earth[6] - very dark brown
      '#2F1B0F', // earth[7] - ultra dark brown
      '#1F1209', // earth[8] - near black brown
      '#0F0905', // earth[9] - black brown
    ],
    // Mist colors for ocean effects
    mist: [
      '#F0FDFA', // mist[0] - lightest aqua
      '#CCFBF1', // mist[1] - light aqua
      '#99F6E4', // mist[2] - medium aqua
      '#5EEAD4', // mist[3] - deep aqua
      '#2DD4BF', // mist[4] - darker aqua
      '#14B8A6', // mist[5] - darkest aqua
      '#0D9488', // mist[6] - very dark aqua
      '#0F766E', // mist[7] - ultra dark aqua
      '#115E59', // mist[8] - near black aqua
      '#134E4A', // mist[9] - black aqua
    ],
  },
  primaryColor: 'ocean',
  primaryShade: 3, // Use ocean[3] as primary
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, Fira Code, Consolas, monospace',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
  components: {
    Tooltip: {
      defaultProps: {
        multiline: true,
        withArrow: true,
        withinPortal: true,
        zIndex: 1000,
      },
      styles: {
        tooltip: {
          fontSize: '14px',
          maxWidth: '280px',
          padding: '8px 12px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
        },
        arrow: {
          zIndex: 1001,
        },
      },
    },
    ActionIcon: {
      styles: {
        root: {
          // Ensure minimum touch target size on mobile
          minHeight: '44px',
          minWidth: '44px',
        },
      },
    },
  },
};
```

#### Theme Selection Rationale

**Theme Philosophy & Use Cases**

| Theme                        | Philosophy                                           | Emotional Tone                    | Best For                                                             | Accessibility                                                           |
| ---------------------------- | ---------------------------------------------------- | --------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Sakura (Default)**         | Cherry blossom aesthetic - delicate, fleeting beauty | Warm, romantic, contemplative     | Creative portfolios, artistic presentations, personal branding       | High contrast reds ensure excellent readability                         |
| **Ocean Mist (Alternative)** | Ocean mist aesthetic - calm, ethereal, contemplative | Professional, serene, trustworthy | Technical portfolios, corporate presentations, professional services | Teal/cyan colors provide excellent contrast and are colorblind-friendly |

### Typography

#### Font Stack

- **Primary Font**: Inter (Google Fonts) - Modern, highly readable
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- **Monospace**: "JetBrains Mono", "Fira Code", Consolas, monospace

#### Type Scale

- **H1 (Hero)**: 3.5rem (56px) / 4rem (64px) mobile / 1.2 line-height
- **H2 (Section Headers)**: 2.5rem (40px) / 1.3 line-height
- **H3 (Subsections)**: 1.875rem (30px) / 1.4 line-height
- **H4 (Card Titles)**: 1.25rem (20px) / 1.5 line-height
- **Body Large**: 1.125rem (18px) / 1.7 line-height
- **Body Regular**: 1rem (16px) / 1.6 line-height
- **Body Small**: 0.875rem (14px) / 1.5 line-height
- **Caption**: 0.75rem (12px) / 1.4 line-height

#### Font Weights

- **Light**: 300 - For subtle text and descriptions
- **Regular**: 400 - Body text and general content
- **Medium**: 500 - Emphasized text and labels
- **Semibold**: 600 - Section headers and important text
- **Bold**: 700 - Hero text and strong emphasis

## Layout & Grid System

### Grid Structure

- **Desktop**: 12-column grid with 24px gutters
- **Tablet**: 8-column grid with 20px gutters
- **Mobile**: 4-column grid with 16px gutters
- **Max Width**: 1200px container with auto margins

### Spacing System

- **Base Unit**: 8px
- **Spacing Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px
- **Section Padding**: 80px vertical, 24px horizontal
- **Card Padding**: 24px all around
- **Component Spacing**: 16px between related elements

### Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

## Component Design System

### Mantine Component Integration

- **Base Components**: Mantine Button, Input, Card, Text, Title, Group, Stack
- **Layout Components**: Mantine Container, Grid, Paper, Box, Center
- **Navigation**: Mantine Navbar, Burger, Anchor, Breadcrumbs
- **Data Display**: Mantine Badge, Avatar, Timeline, List, Table
- **Feedback**: Mantine Alert, Notification, LoadingOverlay, Skeleton
- **Overlays**: Mantine Tooltip, Modal, Popover, Drawer
- **Custom Components**: SakuraPetal, ProjectCard, WorkSectionHeader

#### Atomic Design Principles

- **Atoms**: Mantine Button, Input, Icon + Custom SakuraPetal + Card Wrappers
- **Molecules**: Mantine Card + Custom ProjectCard, SkillBadge, ContactItem + Interactive Cards
- **Organisms**: Custom WorkSection, ExperienceTimeline + Mantine Navbar + Card Grids
- **Templates**: Mantine Container + Custom PageLayout, SectionLayout + Card Layouts
- **Pages**: Home, About, Work, Contact using Mantine components + Card-based interactions

### Navigation

#### Desktop Navigation

- **Height**: 72px
- **Background**: White with subtle shadow
- **Logo**: Left-aligned, 32px height
- **Menu Items**: Right-aligned, 16px font, 24px spacing
- **Hover State**: Color transition to primary blue
- **Active State**: Primary blue color with bottom border

#### Mobile Navigation

- **Height**: 64px
- **Hamburger Menu**: 24px icon, right-aligned
- **Overlay**: Full-screen with blur background
- **Menu Items**: Stacked vertically, 20px font, 32px spacing
- **Close Button**: Top-right corner, 24px icon

### Hero Section

#### Layout

- **Height**: 100vh minimum
- **Content**: Centered vertically and horizontally
- **Background**: Subtle gradient or pattern
- **CTA Buttons**: Primary and secondary styles

#### Typography Hierarchy

- **Headline**: H1 with bold weight, center-aligned
- **Subheadline**: H3 with regular weight, center-aligned
- **Description**: Body large, center-aligned, max-width 600px

#### Visual Elements

- **Profile Image**: Circular, 200px diameter, subtle shadow with sakura petal frame
- **Background Pattern**: Floating sakura petals with gentle movement
- **Scroll Indicator**: Animated sakura petal falling or gentle arrow with petal accent
- **Sakura Petals**: 6-8 petals floating gently across the hero section
- **Gradient Overlay**: Soft pink gradient overlay for warmth

### Work Sections

#### Vibe Coded Section

- **Header**: Sakura pink gradient background with floating petal pattern
- **Card Design**: Rounded corners (12px), sakura pink accent border with petal shadows
- **Badge**: "Vibe Coded" with soft pink background and petal icon
- **Icons**: AI-themed symbols with cherry blossom accents
- **Hover Effect**: Gentle pink glow with floating petal animation
- **Background**: Subtle sakura petal particles floating gently

#### Standard Work Section

- **Header**: Warm brown gradient background with organic texture
- **Card Design**: Rounded corners (12px), warm brown accent border
- **Badge**: "Hand-Coded" with earth-tone background and traditional icon
- **Icons**: Classic development symbols with organic, hand-drawn feel
- **Hover Effect**: Subtle brown glow with gentle paper texture animation
- **Background**: Subtle paper or wood grain texture

#### Project Cards

- **Layout**: 3-column grid on desktop, 2-column on tablet, 1-column on mobile
- **Image**: 16:9 aspect ratio, rounded top corners
- **Content**: Title, description, tech stack, links
- **Actions**: Live demo and GitHub buttons
- **Animation**: Fade-in on scroll, hover lift effect

### About Section

#### Layout

- **Two-Column**: Text content and skills visualization
- **Skills Section**: Interactive skill bars or tag cloud
- **Timeline**: Vertical timeline for career progression
- **Image**: Professional headshot with subtle styling

#### Skills Visualization

- **Skill Bars**: Animated progress bars with percentages
- **Tech Stack**: Tag-based layout with category grouping
- **Proficiency Levels**: Beginner, Intermediate, Advanced, Expert

#### Research Project Cards

- **Layout**: UnifiedCard components with flexible subtitle styling
- **Header Structure**:
  - Title as main heading
  - Description displayed as subtitle with dimmed color (`gray.6`)
  - Header icon (target icon) with sakura color theming
- **Timeline Badge**: Period displayed as timeline badge in footer (right-aligned)
- **Achievements Display**: Plain text format without bullet points (`professionalAchievements=true`)
- **Technology Tags**: Sakura-themed badges with tooltips
- **Styling**:
  - `subtitleColor="dimmed"` for description text
  - Consistent with theme color system
  - Hoverable cards with subtle interactions

#### Education & Leadership Cards

- **Layout**: UnifiedCard components with inline badges
- **GPA Display**: Badge format without tooltips, inline with institution title
- **Location Information**: Displayed on separate line below institution and year
- **Club Abbreviations**: Separate badges with tooltips explaining full club names
- **Timeline**: Year displayed as inline badge, right-aligned
- **Styling**:
  - Invisible dividers for clean visual separation
  - Consistent badge sizing and positioning
  - Theme-aware color usage

### Contact Section

#### Contact Form

- **Layout**: Centered, max-width 600px
- **Fields**: Name, email, subject, message
- **Styling**: Rounded inputs with focus states
- **Validation**: Real-time validation with error messages
- **Submit Button**: Primary style with loading state

#### Contact Information

- **Layout**: Grid of contact methods
- **Icons**: Consistent icon set for each method
- **Links**: Hover effects and external link indicators

## Sakura Petal Effects

### Petal Animation System

- **Floating Petals**: Gentle, random movement across the viewport
- **Petal Shapes**: Organic, hand-drawn style with slight variations
- **Petal Sizes**: 3-4 different sizes (8px, 12px, 16px, 20px)
- **Petal Colors**: Gradient from light pink to deeper pink with transparency
- **Animation Speed**: Very slow, contemplative movement (2-4 seconds per cycle)
- **Petal Density**: 8-12 petals visible at any time
- **Z-Index Layering**: Petals behind content, subtle depth

### Petal Interactions

- **Hover Effects**: Petals gently drift toward cursor
- **Scroll Triggers**: New petals appear on scroll with fade-in animation
- **Work Section Focus**: Petals cluster around active work sections
- **Page Load**: Petals fall gently from top on initial load
- **Mobile Optimization**: Reduced petal count and simpler animations

### Petal Visual Design

- **Shape**: Organic, slightly irregular petal forms
- **Opacity**: 0.3-0.6 for subtle presence
- **Rotation**: Random rotation angles for natural feel
- **Shadow**: Subtle drop shadow for depth
- **Gradient**: Soft pink gradient with transparency
- **Edge Softness**: Blurred edges for dreamy effect

## Interactive Elements

### Card-Based Design System

#### Universal Card Container

- **All Interactive Elements**: Encased in subtle card containers with consistent styling
- **Card Properties**:
  - Rounded corners (12px border radius)
  - Subtle shadow (0 2px 8px rgba(0, 0, 0, 0.08))
  - Smooth transitions (0.2s ease-in-out)
  - Hover elevation increase
- **Card Types**:
  - **Content Cards**: Project cards, skill cards, experience cards
  - **Interactive Cards**: Buttons, links, form elements
  - **Decorative Cards**: Icons, badges, status indicators

#### Card Interaction Patterns

- **Hover State**:
  - Scale transform (1.02x)
  - Shadow increase (0 4px 16px rgba(0, 0, 0, 0.12))
  - Subtle color shift
  - Smooth 0.2s transition
- **Active State**:
  - Scale down (0.98x)
  - Shadow reduction
  - Color intensification
- **Focus State**:
  - Outline ring (2px, primary color)
  - Accessibility-compliant focus indicators

### Comprehensive Hover Effects

#### Non-Text Element Hover System

- **Icons**:
  - Scale animation (1.1x)
  - Color transition to primary color
  - Subtle rotation (2-3 degrees)
  - Glow effect on hover
- **Images**:
  - Gentle zoom (1.05x)
  - Overlay with subtle color tint
  - Smooth transition (0.3s ease-out)
- **Cards**:
  - Lift effect with increased shadow
  - Border color transition
  - Background color shift
  - Content subtle movement
- **Buttons**:
  - Background color transition
  - Scale effect (1.02x)
  - Shadow enhancement
  - Icon animation (if present)

#### Advanced Hover Interactions

- **Project Cards**:
  - Image overlay with project details
  - Tech stack badges appear
  - Action buttons slide up
  - Subtle sakura petal animation
- **Skill Badges**:
  - Color intensity increase
  - Subtle bounce animation
  - Tooltip with proficiency level
  - Glow effect matching skill category
- **Navigation Items**:
  - Underline animation from left to right
  - Background color fade-in
  - Icon rotation (if present)
  - Smooth color transition

#### Scroll Indicator

The scroll indicator is a sophisticated navigation component that provides both visual progress feedback and interactive section navigation.

##### Design Principles

- **Card-Based Container**: Follows the universal card design system with 12px border radius and theme-aware styling
- **Theme Integration**: Fully theme-aware with dynamic colors, shadows, and effects
- **Accessibility First**: Keyboard navigation support and descriptive aria-labels
- **Progressive Enhancement**: Graceful degradation for different screen sizes and orientations

##### Visual Design

- **Container Styling**:
  - Background: Theme-aware card background with opacity (`backgroundCardCC`)
  - Border: Theme-aware primary border color
  - Border Radius: 12px (horizontal) / 16px (vertical)
  - Backdrop Filter: 20px blur for glassmorphism effect
  - Shadow: Dynamic shadow system with hover enhancement

- **Hover Effects**:
  - Scale Transform: 1.02x on hover
  - Shadow Enhancement: Increased shadow depth and glow
  - Border: Maintains consistent border color (no outline change)
  - Transition: Smooth 0.3s ease-out animation

##### Functional Behavior

- **Visibility Management**:
  - Auto-hide after 2 seconds of inactivity
  - Stays visible while hovering over the component
  - Shows on scroll, keyboard navigation, and user interaction
  - Dynamic delay reset based on recent interactions

- **Progress Tracking**:
  - Real-time scroll progress percentage
  - Theme-aware progress bar with primary accent color
  - Smooth progress updates with throttled scroll detection

- **Section Navigation**:
  - Visual section indicators with current section highlighting
  - Arrow buttons for previous/next section navigation
  - Keyboard support (arrow keys) for section navigation
  - Smooth scrolling to target sections

##### Variants

1. **Horizontal Variant (Bottom)**:
   - Position: Fixed bottom center
   - Layout: Horizontal progress bar with section indicators
   - Width: Minimum 400px, responsive
   - Use Case: Desktop and tablet landscape

2. **Vertical Variant (Side)**:
   - Position: Fixed left/right side
   - Layout: Vertical progress bar with compact section list
   - Width: Minimum 200px
   - Use Case: Desktop portrait and mobile

##### Theme Integration

- **Color System**: Uses theme-aware color hooks for all styling
- **Dynamic Adaptation**: Automatically adapts to sakura/ocean theme changes
- **Consistent Styling**: Follows the same design tokens as other components
- **Accessibility**: Maintains proper contrast ratios across all themes

##### Interaction Patterns

- **Hover State**:
  - Container scale and shadow enhancement
  - Section button hover effects with scale and color changes
  - Smooth transitions for all interactive elements

- **Active State**:
  - Button press animations with visual feedback
  - Current section highlighting with gradient background
  - Progress bar color updates

- **Focus State**:
  - Keyboard navigation with visible focus indicators
  - Accessible button labels and descriptions
  - Screen reader friendly section announcements

### Animations

#### Page Transitions

- **Fade In**: 0.3s ease-out for page load
- **Slide Up**: 0.4s ease-out for section reveals
- **Stagger**: 0.1s delay between card animations
- **Card Cascade**: Sequential card appearance with 0.1s intervals

#### Hover Effects

- **Cards**: Scale (1.02x) with shadow increase
- **Buttons**: Color transition and slight scale
- **Links**: Underline animation from left to right
- **Images**: Subtle zoom effect
- **Icons**: Scale and color transition
- **Interactive Elements**: Universal hover feedback

#### Loading States

The portfolio implements a comprehensive skeleton loading system that provides meaningful loading states for all major sections:

##### Skeleton System Architecture

- **BaseSkeleton Component**: Foundation component with theme-aware colors and shimmer animation
- **Content-Specific Skeletons**: Tailored loading states for each section that mimic actual content structure
- **Consistent Animation**: Unified shimmer effect across all skeleton components

##### Section-Specific Skeletons

- **HeroSectionSkeleton**: Mimics hero layout with title, subtitle, and CTA buttons
- **AboutSectionSkeleton**: Replicates skills grid, research projects, and leadership sections
- **WorkSectionSkeleton**: Mirrors project card grid layout with proper spacing
- **ExperienceSectionSkeleton**: Reflects timeline/card layout with company details
- **ContactSectionSkeleton**: Matches form layout and contact information structure

##### Skeleton Features

- **Shimmer Animation**: CSS-based shimmer effect with `skeleton-shimmer` keyframes
- **Responsive Design**: Adapts to different screen sizes like actual content
- **Accessibility**: Proper ARIA labels and semantic structure
- **Performance**: Lightweight components with optimized rendering

##### Loading State Hierarchy

- **Above-the-Fold**: Hero section loads immediately with skeleton fallback
- **Lazy Sections**: All other sections use lazy loading with content-specific skeletons
- **Form States**: Traditional spinners for form submissions and interactions

### Micro-Interactions

#### Button States

- **Default**: Primary color with subtle shadow
- **Hover**: Darker shade with increased shadow
- **Active**: Pressed state with reduced shadow
- **Disabled**: Muted color with no interaction
- **Loading**: Spinner with disabled state

#### Form Interactions

- **Focus**: Blue border with subtle glow
- **Error**: Red border with shake animation
- **Success**: Green border with checkmark
- **Loading**: Spinner with disabled state

#### Card-Specific Interactions

- **Project Cards**:
  - Hover: Image overlay, tech stack reveal
  - Click: Smooth transition to detail view
  - Focus: Keyboard navigation support
- **Skill Cards**:
  - Hover: Proficiency level tooltip
  - Click: Filter projects by skill
  - Focus: Clear focus indicators
- **Experience Cards**:
  - Hover: Timeline connection highlight
  - Click: Expand for detailed information
  - Focus: Keyboard accessible navigation

### Badge Design System

#### Badge Design Principles

The portfolio implements a comprehensive badge system that provides consistent visual indicators for various content types while maintaining the cherry blossom aesthetic and professional appearance.

##### Badge Categories

1. **Status Badges**: Indicate current state or availability
2. **Skill Badges**: Display technical proficiencies and competencies
3. **Technology Badges**: Show tools, frameworks, and technologies
4. **Achievement Badges**: Highlight accomplishments and credentials
5. **Context Badges**: Provide additional information or categorization

##### Badge Design Specifications

###### Visual Design

- **Shape**: Rounded rectangle with consistent border radius (8px for small, 12px for medium)
- **Typography**: 12px-14px font size with medium weight (500-600)
- **Padding**: 6px-8px horizontal, 4px-6px vertical
- **Border**: Optional 1px border for outline variants
- **Shadow**: Subtle drop shadow for depth and elevation

###### Color System

- **Primary Badges**: Use theme-aware primary colors (sakura/ocean)
- **Secondary Badges**: Neutral colors with theme-aware accents
- **Status Badges**: Semantic colors (success, warning, error, info)
- **Skill Badges**: Dynamic colors based on proficiency level
- **Technology Badges**: Consistent neutral styling with theme accents

###### Size Variants

| Size   | Font Size | Padding   | Border Radius | Use Case                           |
| ------ | --------- | --------- | ------------- | ---------------------------------- |
| **xs** | 10px      | 4px 6px   | 6px           | Compact spaces, tags               |
| **sm** | 12px      | 6px 8px   | 8px           | Standard badges, skills            |
| **md** | 14px      | 8px 12px  | 10px          | Prominent badges, achievements     |
| **lg** | 16px      | 10px 16px | 12px          | Hero badges, major accomplishments |

###### Variant Styles

1. **Filled**: Solid background with contrasting text
2. **Light**: Light background with colored text and border
3. **Outline**: Transparent background with colored border and text
4. **Gradient**: Theme-aware gradient background
5. **Subtle**: Very light background with muted text

##### Interactive Behavior

###### Hover Effects

- **Scale Animation**: 1.05x scale transform on hover
- **Shadow Enhancement**: Increased shadow depth and glow
- **Color Transition**: Smooth color intensity changes
- **Duration**: 0.2s ease-in-out transition
- **Cursor**: Default cursor for non-clickable badges

###### Focus States

- **Outline Ring**: 2px outline ring for keyboard navigation
- **High Contrast**: Enhanced contrast for accessibility
- **Focus Management**: Proper tab order and focus indicators

##### Badge Implementation Patterns

###### Skill Proficiency Badges

```typescript
// Dynamic color based on skill level
const getSkillBadgeColor = (level: string, theme: string) => {
  const colorMap = {
    beginner: theme === 'sakura' ? 'pink' : 'mist',
    intermediate: theme === 'sakura' ? 'sakura' : 'ocean',
    advanced: theme === 'sakura' ? 'red' : 'teal',
    expert: theme === 'sakura' ? 'grape' : 'cyan',
  };
  return colorMap[level] || 'gray';
};
```

###### Technology Badges

```typescript
// Consistent styling for technology indicators
<Badge
  color="sakura"
  variant="light"
  size="sm"
  radius="md"
  style={{
    cursor: 'default',
    transition: 'all 0.2s ease',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
  {technology}
</Badge>
```

###### Achievement Badges (GPA Example)

```typescript
// Specialized badges for achievements and credentials
<Badge
  color="sakura"
  variant="light"
  size="sm"
  radius="md"
  style={{
    cursor: 'default',
    transition: 'all 0.2s ease',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
  GPA: {gpa}
</Badge>
```

##### Accessibility Considerations

- **Color Contrast**: Minimum 4.5:1 contrast ratio for text
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Keyboard Navigation**: Focusable badges with clear focus indicators
- **Touch Targets**: Minimum 44px touch target for mobile devices
- **High Contrast Mode**: Alternative styling for high contrast preferences

##### Theme Integration

- **Dynamic Colors**: All badges adapt to current theme (sakura/ocean)
- **Consistent Styling**: Unified appearance across all themes
- **Fallback Values**: Graceful degradation for theme switching
- **Performance**: Optimized rendering with theme-aware color hooks

##### Usage Guidelines

1. **Consistency**: Use the same badge style for similar content types
2. **Hierarchy**: Use size and color to indicate importance
3. **Clarity**: Keep badge text concise and meaningful
4. **Accessibility**: Ensure all badges meet accessibility standards
5. **Performance**: Use appropriate hover effects without impacting performance

### Tooltip System

#### Tooltip Design Specifications

- **Appearance**:
  - Background: Semi-transparent dark overlay (#1A1A1A with 0.9 opacity)
  - Text Color: White (#FFFFFF)
  - Border Radius: 8px
  - Font Size: 14px
  - Max Width: 280px
  - Padding: 8px 12px
  - Box Shadow: 0 4px 12px rgba(0, 0, 0, 0.15)
  - Z-Index: 1000

#### Tooltip Behavior

- **Trigger**: Hover on interactive elements
- **Delay**: 500ms before showing
- **Duration**: 200ms fade-in/out transition
- **Positioning**: Smart positioning to avoid viewport edges
- **Arrow**: Small triangular pointer (z-index: 1001)
- **Multiline Support**: Automatic text wrapping for longer content
- **Portal Rendering**: Rendered outside component tree to avoid clipping

#### Tooltip Content Types

- **Skill Proficiency**: "Advanced", "Intermediate", "Expert" levels
- **Technology Details**: Brief descriptions of tools and frameworks
- **Project Information**: Quick project stats, tech stack, or key features
- **Navigation Hints**: Helpful context for navigation items
- **Status Indicators**: Current state or availability information
- **Accessibility Info**: Screen reader friendly descriptions

#### Tooltip Accessibility

- **Keyboard Navigation**: Tooltips appear on focus for keyboard users
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Tooltips don't interfere with tab order
- **Dismissal**: Tooltips disappear when focus moves or element is no longer hovered
- **High Contrast**: Meets WCAG contrast requirements

## Responsive Design

### Mobile-First Approach

- **Base Styles**: Mobile-optimized
- **Progressive Enhancement**: Add features for larger screens
- **Touch Targets**: Minimum 44px for interactive elements
- **Readable Text**: Minimum 16px font size

### Breakpoint-Specific Adjustments

#### Mobile (320px - 767px)

- **Single Column**: All content stacked vertically
- **Larger Touch Targets**: Buttons and links
- **Simplified Navigation**: Hamburger menu
- **Reduced Spacing**: Tighter vertical rhythm

#### Tablet (768px - 1023px)

- **Two-Column Layout**: Where appropriate
- **Larger Images**: Better visual impact
- **Hover States**: Maintained for touch devices
- **Grid Adjustments**: 2-column project cards

#### Desktop (1024px+)

- **Multi-Column Layout**: Full grid system
- **Hover Effects**: All interactive elements
- **Larger Typography**: Enhanced readability
- **Complex Animations**: Full feature set

## Accessibility Design

### Color Contrast

- **Text on Background**: Minimum 4.5:1 ratio
- **Large Text**: Minimum 3:1 ratio
- **Interactive Elements**: High contrast for visibility
- **Focus Indicators**: Clear, high-contrast outlines

### Visual Hierarchy

- **Clear Headings**: Proper heading structure
- **Consistent Spacing**: Predictable layout patterns
- **Logical Flow**: Left-to-right, top-to-bottom
- **Grouped Content**: Related elements visually connected

### Interactive Elements

- **Focus States**: Visible focus indicators
- **Keyboard Navigation**: All elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels
- **Alternative Text**: Descriptive alt text for images

## Brand Personality

### Visual Tone

- **Contemplative**: Reflective and thoughtful, embracing the beauty of transience
- **Elegant**: Sophisticated yet gentle, like cherry blossoms in spring
- **Professional**: Clean and trustworthy while maintaining warmth
- **Poetic**: Subtle beauty that speaks to deeper meaning
- **Approachable**: Friendly and inviting without being casual

### Design Language

- **Organic**: Flowing, natural shapes inspired by nature
- **Minimalist**: Essential elements with breathing room
- **Consistent**: Unified visual language throughout
- **Purposeful**: Every element serves a function
- **Transient**: Elements that suggest the beauty of impermanence

## Design Assets

### Icons

- **Style**: Outline style with 2px stroke weight
- **Size**: 16px, 20px, 24px, 32px variants
- **Library**: Heroicons or Feather Icons
- **Custom Icons**: For unique elements like work section badges

### Images

- **Profile Photo**: Professional headshot, 400x400px minimum
- **Project Screenshots**: High-resolution, consistent aspect ratios
- **Background Images**: Subtle, non-distracting patterns

## Recent Improvements & Updates

### Component Architecture Refactoring (Latest)

- **Modular Design**: Extracted all sections into dedicated components (Hero, About, Work, Experience, Contact)
- **Lazy Loading**: Implemented universal lazy loading with content-specific skeleton states
- **Code Organization**: Reduced `page.tsx` from 254 lines to ~120 lines for better maintainability
- **Performance**: Bundle splitting and progressive loading for optimal user experience

### UnifiedCard Component Enhancements (Current)

#### Flexible Subtitle Styling

- **New `subtitleColor` Prop**: Added to `UnifiedCardProps` and `HeaderSectionProps`
- **Dynamic Color Application**: Allows per-card subtitle color customization
- **Fallback System**: Defaults to `sakura` theme color when `subtitleColor` not specified
- **Research Projects**: Use `subtitleColor="dimmed"` for description text
- **Consistent Theming**: Maintains theme system integration while allowing overrides

#### Timeline Badge Positioning

- **Work Experience Cards**: Timeline badges properly positioned right-aligned in header
- **Research Project Cards**: Timeline badges moved to footer for better visual hierarchy
- **Flexbox Layout**: Restored proper flexbox structure from `feat-32` implementation
- **Text Alignment**: Position text now properly inline with titles

#### Achievement Display Options

- **Professional Mode**: Added `professionalAchievements=true` prop to remove bullet points
- **Research Projects**: Display achievements as plain italic text instead of bulleted lists
- **Flexible Rendering**: Maintains backward compatibility with existing bulleted format

### Theme System Implementation

#### Dynamic Theme Switching

- **User Control**: Header controls for palette and appearance mode
- **Persistent Preferences**: Palette and appearance choices saved in localStorage
- **System Integration**: `Auto` follows the user's system theme preference
- **Smooth Transitions**: Seamless switching between sakura and ocean themes

#### Enhanced Visual Effects

- **Improved Parallax**: More dramatic scrolling effects for better visual impact
- **Sakura Effects**: Optimized loading and performance for background effects
- **Color Consistency**: Fixed color flashes and layout shifts on initial load
- **Gradient Text**: Enhanced gradient text effects with proper CSS properties

#### Technical Improvements

- **CSS Property Conflicts**: Resolved background vs backgroundClip conflicts
- **Layout Stability**: Fixed hero section layout shifts during parallax initialization
- **Theme-Aware Components**: All components now use dynamic color system
- **Performance Optimization**: Improved loading times and reduced layout shifts

#### Component Updates

- **Skill Badges**: Updated to use theme-aware color system with better contrast
- **Footer Text**: Fixed gradient text visibility across themes
- **Navigation**: Enhanced with theme-aware colors and effects
- **Technical Details Modal**: Complete design system overhaul with enhanced UX
- **Scroll Indicator**: Complete redesign with enhanced hover effects and improved UX

#### Technical Details Modal Overhaul

The technical details modal has undergone a comprehensive redesign to align with the design system and improve user experience:

##### Design System Compliance

- **Badge Styling Consistency**: All badges now match UnifiedCard styling patterns
  - Tools badges: `size="sm"`, `variant="filled"` (matching AI tools in UnifiedCard)
  - Components badges: `size="sm"`, `variant="outline"` (matching technologies in UnifiedCard)
  - Removed custom styling overrides in favor of BadgeWithTooltip defaults
  - Leveraged built-in hover effects with scale(1.05) and shadow
- **Visual Cleanup**: Removed all `withBorder` props and border styles from box elements
  - Clean up visual clutter while maintaining card structure
  - Keep essential borders only for tab folder effect
  - Maintain box shadows for depth and visual hierarchy

##### Modal Size & Layout Improvements

- **Compact Design**: Reduced modal width from 22% to 20% for more compact display
- **Height Optimization**: Set to 70vh for better content visibility and improved user experience
- **Scroll Behavior**: Fixed header stays fixed while only body content scrolls
  - Header uses `flex-shrink: 0` to prevent shrinking
  - Body has `overflow-y: auto` and `flex: 1` for proper scrolling
  - Content uses `overflow: hidden` to contain scroll within body area
- **Responsive Design**: Proper height calculations for different screen sizes

##### User Experience Enhancements

- **Scroll Indicator Integration**: Modal state tracking via React Context
  - Hide scroll indicator when technical details modal is open
  - Use React context instead of DOM detection for better performance
  - Add `hideWhenModalOpen` prop to ScrollIndicator component
  - Wrap app with ModalProvider for global modal state management
- **Content Organization**: Removed redundant components section
  - Components displayed only as badges in architecture section
  - Eliminated visual duplication and improved efficiency
  - Cleaner interface with better information hierarchy
- **Accessibility**: Maintained keyboard navigation and focus management
  - Proper ARIA attributes and screen reader support
  - Consistent tab navigation within modal
  - Focus management during modal open/close

##### Mobile Experience Overhaul

- **Responsive Sizing**: Replaced fixed viewport units with Mantine's responsive sizing system
  - Changed from `size="20%"` to `size="xl"` for proper mobile width
  - Implemented responsive heights: 85vh on tablet, 90vh on mobile
  - Removed fixed width constraints that were too narrow on mobile
- **Touch-Friendly Interface**: Enhanced touch interaction for mobile devices
  - Increased tab button height to 48px on mobile (44px on small screens)
  - Added proper padding (12px-16px) for comfortable touch targets
  - Optimized font sizes for mobile readability (14px/13px)
  - Maintained horizontal scrolling for tab navigation when needed
- **Mobile-Specific CSS**: Added targeted mobile styles with proper breakpoints
  - Media queries at 768px (tablet) and 480px (small mobile)
  - Touch-friendly tab styling with `!important` overrides
  - Proper margin and border radius adjustments for mobile screens
- **Accessibility**: Maintained keyboard navigation and screen reader support
  - Preserved ARIA attributes and focus management
  - Touch targets meet accessibility guidelines (44px minimum)
  - Proper contrast and readability on mobile devices

##### Technical Implementation

- **Modal Context**: Created `ModalContext` for reliable modal state tracking
- **CSS Flexbox**: Implemented proper flex layout for content containment
- **Height Constraints**: Added explicit height constraints to prevent stretching
- **Performance**: Reduced DOM complexity by removing redundant sections
- **Theme Integration**: Full theme-aware color system integration
- **Mobile Optimization**: Complete mobile experience overhaul with responsive design

#### Modal Height Enhancement (Latest Update)

The technical details modal height has been increased to improve user experience and content visibility:

##### Height Optimization

- **Desktop Height**: Increased from 45vh to 70vh for better content visibility
- **Body Content Area**: Updated to `calc(65vh - 100px)` to accommodate the new modal height
- **Image Modal**: Also updated to 70vh for consistency across all modal instances
- **Responsive Design**: Mobile heights remain unchanged (85vh tablet, 90vh mobile) as they were already optimal

##### User Experience Benefits

- **Better Content Visibility**: Users can see more technical details without excessive scrolling
- **Improved Readability**: More space for content reduces cramped feeling
- **Enhanced Navigation**: Better visibility of tab navigation and content sections
- **Consistent Experience**: Both main modal and image preview modal now have matching heights

##### Technical Implementation

- **Component Updates**: Updated `TechnicalDetailsModal.tsx` inline styles for both modal instances
- **CSS Updates**: Modified `technical-modal.css` to reflect new height values
- **Maintained Responsiveness**: Preserved existing mobile-optimized heights
- **Performance**: No impact on performance as only height values were changed

#### Scroll Indicator Enhancements

- **Hover Effects**: Added scale transform and enhanced shadows for better interactivity
- **Visibility Management**: Stays visible while hovering, auto-hides with smart timeout logic
- **Theme Integration**: Fully theme-aware with dynamic colors and consistent styling
- **Clean Design**: Removed status indicator dots for cleaner appearance
- **Modal Integration**: Hide scroll indicator when technical details modal is open
  - React Context-based modal state tracking for reliable detection
  - `hideWhenModalOpen` prop for flexible control
  - ModalProvider wraps entire app for global state management
  - Improved performance over DOM-based detection methods
- **Build Process**: Improved build script to auto-format before building

### Accessibility Enhancements

- **Color Contrast**: Improved contrast ratios for both themes
- **Theme Fallbacks**: Sakura theme as default with graceful degradation
- **Screen Reader Support**: Maintained accessibility features across theme changes
- **Keyboard Navigation**: Theme toggle accessible via keyboard

### Performance Optimizations

#### Loading & Rendering Performance

- **Universal Lazy Loading**: All major sections use code-splitting for optimal bundle size
- **Skeleton Loading System**: Content-specific loading states with theme-aware colors and shimmer animation
- **Progressive Enhancement**: Graceful degradation from skeleton to full content
- **Bundle Optimization**: Modular architecture reduces initial bundle size and improves maintainability

#### Technical Optimizations

- **Effect Loading**: Improved sakura effect loading with better error handling
- **Parallax Timing**: Optimized parallax element initialization
- **Color Loading**: Fixed color flash issues on initial page load
- **Responsive Design**: Loading states and components adapt to different screen sizes

### Technical Implementation Details

#### Skeleton System Architecture

The portfolio implements a sophisticated skeleton loading system built on a foundation of reusable components and theme integration:

##### BaseSkeleton Component

```typescript
// Foundation component with theme-aware colors and shimmer animation
const BaseSkeleton = memo(({ height, width, radius, className, animated, variant }) => {
  const colorCombinations = useColorCombinations();

  return (
    <Skeleton
      style={{
        background: colorCombinations.skeletonGradient,
        backgroundSize: '200% 100%',
        animation: animated ? 'skeleton-shimmer 1.5s infinite ease-in-out' : 'none',
      }}
      // ... other props
    />
  );
});
```

##### Theme Integration

- **Dynamic Colors**: Uses `useColorCombinations()` for skeleton gradients and `useCommonColors()` for borders/shadows
- **CSS Variables**: Fallback values in critical CSS for theme switching
- **Consistent Theming**: All skeletons adapt automatically to current theme

##### Component Structure

```
src/components/skeletons/
├── BaseSkeleton.tsx           # Foundation component
├── HeroSectionSkeleton.tsx    # Hero section loading state
├── AboutSectionSkeleton.tsx   # About section loading state
├── WorkSectionSkeleton.tsx    # Work section loading state
├── ExperienceSectionSkeleton.tsx # Experience section loading state
├── ContactSectionSkeleton.tsx # Contact section loading state
└── index.ts                   # Export barrel
```

##### Lazy Loading Implementation

```typescript
// LazyComponents.tsx
export const LazyHeroSection = dynamic(() => import('./HeroSection'), {
  loading: () => <HeroSectionSkeleton />,
  ssr: false,
});
```

##### CSS Animation System

```css
@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-title {
  background: var(--skeleton-gradient, fallback);
  animation: skeleton-shimmer 1.5s infinite ease-in-out;
}
```

## Design Validation

### User Testing Scenarios

- **First Impression**: 5-second test for immediate impact
- **Navigation**: Find specific information quickly
- **Mobile Experience**: Complete tasks on mobile device
- **Accessibility**: Screen reader and keyboard navigation

### Design Review Checklist

- [ ] Consistent color usage throughout
- [ ] Proper typography hierarchy
- [ ] Responsive design at all breakpoints
- [ ] Accessibility standards met
- [ ] Performance considerations addressed
- [ ] Brand consistency maintained
- [ ] User experience flows logical
- [ ] Visual hierarchy clear and effective

## Future Design Considerations

### Scalability

- **Component Library**: Reusable design components
- **Design Tokens**: Centralized design values
- **Style Guide**: Living documentation
- **Version Control**: Design system updates

### Enhancement Opportunities

- **Dark Mode**: Alternative color scheme
- **Animation Library**: Advanced micro-interactions
- **Custom Illustrations**: Brand-specific graphics
- **Advanced Typography**: Variable fonts and effects

---

_This design document will be updated as the visual design evolves and new requirements are identified._
