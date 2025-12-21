import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { AnimatedBackground } from "@/components/ui/animated-background";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AnimatedBackground />
            <LayoutWrapper>
                {children}
            </LayoutWrapper>
        </>
    );
}
