import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { motion } from "framer-motion";
import { Moon } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

export default function SwitchThemeDialog() {
    const mounted = useMounted();
    if (!mounted) return null;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative group"
                >
                    <Moon className="h-5 w-5 transition-transform group-hover:rotate-12" />
                </Button>
            </DialogTrigger>

            <DialogContent className="border-none bg-transparent p-0 shadow-none data-[state=open]:animate-none data-[state=closed]:animate-none">
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                    className="relative overflow-hidden rounded-xl border border-primary/10 bg-background p-6 text-white shadow-2xl"
                >
                    <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-500/20 blur-3xl" />

                    <DialogHeader className="relative z-10 items-center space-y-3">
                        <motion.div
                            initial={{ rotate: -20, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-600/10 ring-1 ring-teal-500/10"
                        >
                            <Moon className="h-8 w-8 text-teal-400" />
                        </motion.div>

                        <DialogTitle className="text-2xl font-bold tracking-tight">
                            Dark Mode Enthusiast 🌙
                        </DialogTitle>

                        <DialogDescription className="text-center text-sm text-muted-foreground">
                            Light mode?
                            <span className="text-primary font-medium"> Not in this universe.</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="relative z-10 mt-6 space-y-4 text-center">
                        <p className="text-sm text-zinc-300">
                            I design & code exclusively for dark mode lovers.
                            Because your eyes deserve peace ✨
                        </p>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
