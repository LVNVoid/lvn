import { SlideUp } from "@/components/ui/animated";
import { GraduationCap } from "lucide-react";
import type { Education as EducationType } from "@/schemas/education-schema";

interface EducationProps {
  educations: readonly EducationType[];
}

export function Education({ educations }: EducationProps) {
  if (!educations || educations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/80 p-8 text-center text-sm text-muted-foreground">
        No education history recorded yet.
      </div>
    );
  }

  return (
    <div className="relative border-l border-border/80 pl-6 sm:pl-8 space-y-8 my-4 ml-3 sm:ml-4">
      {educations.map((edu, index) => (
        <SlideUp key={edu.id ?? index} delay={index * 0.1}>
          <div className="relative group">
            {/* Timeline Node Beacon */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-teal-500 shadow-sm transition-transform group-hover:scale-125">
              <span className="h-1.5 w-1.5 rounded-full bg-background" />
            </div>

            {/* Education Card */}
            <div className="rounded-xl border border-border/80 bg-card/60 p-5 sm:p-6 transition-all hover:border-teal-500/40 hover:bg-card/80">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                  {edu.school}
                </h3>
                <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-border/60 bg-secondary/50 px-2.5 py-0.5 text-xs font-mono text-muted-foreground shrink-0">
                  <GraduationCap className="h-3 w-3 text-teal-400" />
                  {edu.year}
                </span>
              </div>

              <p className="text-sm sm:text-base font-medium text-teal-400 mt-1">
                {edu.degree}
              </p>

              {edu.description && (
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {edu.description}
                </p>
              )}
            </div>
          </div>
        </SlideUp>
      ))}
    </div>
  );
}
