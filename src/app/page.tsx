import {
  LazyAboutSection,
  LazyContactSection,
  LazyExperienceSection,
  LazyWatchSection,
  LazyWorkSection,
} from '@/components/LazyComponents';
import DeferredSection from '@/components/DeferredSection';
import HeroSection from '@/components/HeroSection';
import HomePageProviders from '@/components/HomePageProviders';
import { getSectionSpeed } from '@/lib/parallax-config';

export default function HomePage() {
  return (
    <HomePageProviders>
      <HeroSection />

      <DeferredSection
        id="watch"
        label="Content archive"
        minHeight="100vh"
        padding="4rem 0"
        speed={getSectionSpeed('watch')}
      >
        <LazyWatchSection />
      </DeferredSection>

      <DeferredSection
        id="work"
        label="Software projects"
        minHeight="100vh"
        padding="4rem 0"
        speed={getSectionSpeed('work')}
      >
        <LazyWorkSection />
      </DeferredSection>

      <DeferredSection
        id="experience"
        label="Professional experience"
        minHeight="100vh"
        padding="8rem 0 4rem"
        scrollMarginTop="7rem"
        speed={getSectionSpeed('experience')}
      >
        <LazyExperienceSection />
      </DeferredSection>

      <DeferredSection
        id="about"
        label="Qualifications"
        minHeight="100vh"
        padding="4rem 0"
        speed={getSectionSpeed('about')}
      >
        <LazyAboutSection />
      </DeferredSection>

      <DeferredSection
        id="contact"
        label="Contact information"
        padding="4rem 0 2rem"
        speed={getSectionSpeed('contact')}
      >
        <LazyContactSection />
      </DeferredSection>
    </HomePageProviders>
  );
}
