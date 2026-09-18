export function AnimatedBackground() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden bg-background"
        >
            <div className="absolute -top-[30%] left-1/2 -z-10 h-[650px] w-[850px] -translate-x-1/2 rounded-full bg-gradient-to-b from-teal-500/10 via-teal-900/5 to-transparent blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(15,118,110,0.08),rgba(255,255,255,0))]" />
        </div>
    );
}
