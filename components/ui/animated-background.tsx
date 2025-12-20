"use client";

import Squares from "./squares";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="fixed inset-0 -z-10 h-full w-full bg-background" />;

    const isDark = resolvedTheme === "dark";

    return (
        <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-background">
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Squares
                    speed={0.2}
                    squareSize={50}
                    direction='diagonal'
                    borderColor={isDark ? '#0a8a9bff' : '#0a8a9b40'}
                    hoverFillColor={isDark ? '#222' : '#f0f0f0'}
                    maskColor={isDark ? '#060010' : '#ffffff'}
                />
            </div>
        </div>
    );
}
