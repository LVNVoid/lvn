import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { getSkills } from "@/services/skill-service";

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.035em] text-foreground">
              Skills & Stacks
            </h2>
            <span className="inline-flex items-center rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-0.5 text-xs font-mono text-teal-400">
              {skills.length} Records
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Technologies, programming languages, and architectural tools in your stack.
          </p>
        </div>
        <Button size="sm" asChild className="gap-1.5 self-start sm:self-auto font-medium">
          <Link href="/admin/skills/new">
            <Plus className="h-4 w-4" /> Add Skill
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border/80 bg-card/60 overflow-hidden shadow-xs">
        <Table>
          <TableHeader className="bg-secondary/40 border-b border-border/80">
            <TableRow>
              <TableHead className="font-mono text-xs text-muted-foreground uppercase">Skill Name</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground uppercase">Category</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-32 text-center text-xs font-mono text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <Code2 className="h-6 w-6 text-muted-foreground/40" />
                    <span>No skill records found in database.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              skills.map((skill) => (
                <TableRow key={skill.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="font-semibold text-sm text-foreground">{skill.name}</TableCell>
                  <TableCell>
                    {skill.category && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-mono border border-border/50 bg-secondary/70 px-2 py-0.5"
                      >
                        {skill.category}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <DeleteButton id={skill.id} section="skills" itemName="Skill" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
