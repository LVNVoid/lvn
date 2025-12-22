import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { AnimatedBackground } from "@/components/ui/animated-background";

import prisma from "@/lib/prisma";

async function getProfile() {
    try {
        const profile = await prisma.profile.findFirst();
        return profile;
    } catch (error) {
        console.error("Failed to fetch profile", error);
        return null;
    }
}

export default async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const profile = await getProfile();

    return (
        <>
            <AnimatedBackground />
            <LayoutWrapper profile={profile}>
                {children}
            </LayoutWrapper>
        </>
    );
}
