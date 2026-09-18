import { Metadata } from 'next';
import { ChangePasswordForm } from '@/components/admin/change-password-form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Shield, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security Settings | Admin Console',
  description: 'Manage admin password and account security settings.',
};

export default async function AdminSecurityPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-teal-400" />
          <h2 className="text-2xl font-bold tracking-tight">Security & Credentials</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Manage access credentials and password authentication for administrative accounts.
        </p>
      </div>

      {session?.user?.email && (
        <div className="p-4 rounded-xl border border-border/70 bg-card/30 flex items-center justify-between max-w-2xl text-sm">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-foreground">Signed in as</p>
              <p className="text-muted-foreground text-xs font-mono">{session.user.email}</p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-medium">
            Protected Session
          </span>
        </div>
      )}

      <ChangePasswordForm />
    </div>
  );
}
