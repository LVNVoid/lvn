"use client";

import Particles from "./particles";

export function AnimatedBackground() {
    return (
        // <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-background">
        //     <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.15),transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.1),transparent)]" />
        //     <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-primary/5 to-transparent blur-3xl" />

        //     {/* Animated orbs */}
        //     <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px] animate-gradient-xy opacity-50" />
        //     <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[100px] animate-gradient-xy opacity-50 delay-1000" />
        // </div>
        <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-background">
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Particles
                    particleColors={['#66b2b2 ', '#66b2b2 ']}
                    particleCount={400}
                    particleSpread={10}
                    speed={0.2}
                    particleBaseSize={300}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>
        </div>

    );
}
