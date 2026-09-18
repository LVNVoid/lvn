import { LayoutWrapper } from '@/components/layout/layout-wrapper';
import { getProfile } from '@/services/profile-service';

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile();

  return (
    <div>
      <LayoutWrapper profile={profile}>
        <div className="max-w-6xl mx-auto">{children}</div>
      </LayoutWrapper>
    </div>
  );
}
