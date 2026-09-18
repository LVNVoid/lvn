import { SlideUp } from '@/components/ui/animated';
import { PageHeader } from '@/components/ui/page-header';
import { GraduationCap, User } from 'lucide-react';
import { getProfile } from '@/services/profile-service';
import { getEducations } from '@/services/education-service';
import { Education } from '@/components/sections/education';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Learn more about Elvien, his background, education, and journey as a Software Engineer.',
};

export default async function AboutPage() {
  const [profile, educations] = await Promise.all([
    getProfile(),
    getEducations(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="About Me"
        description="Who I am and what I do."
        icon={User}
      />

      <SlideUp delay={0.1}>
        <div className="prose dark:prose-invert">
          <p className="text-lg leading-relaxed">
            {profile?.bio || 'Software Engineer and Full Stack Developer.'}
          </p>
          <p className="mt-4 text-muted-foreground">
            I am a dedicated developer with a passion for creating elegant
            solutions to complex problems. My journey in tech has been driven by
            curiosity and a desire to build things that matter.
          </p>
        </div>
      </SlideUp>

      <div className="w-full h-[1px] bg-border/50 my-6" />

      <PageHeader
        title="Education"
        description="My education"
        icon={GraduationCap}
      />
      <SlideUp delay={0.2}>
        <div className="prose dark:prose-invert">
          <Education educations={educations} />
        </div>
      </SlideUp>
    </div>
  );
}
