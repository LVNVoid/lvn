export function Footer() {
    return (
        <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by <span className="font-medium underline underline-offset-4">Elvien</span>.
                </p>
                <div className="flex items-center gap-4">
                    <a href="https://github.com/elvien" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary">
                        GitHub
                    </a>
                    <a href="https://linkedin.com/in/elvien" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary">
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}
