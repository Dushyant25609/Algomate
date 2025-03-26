import { FC } from 'react';
import { GitHubRepo } from '@/interface/github';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  Star,
  GitBranch,
  Code,
  Github,
  Calendar,
  Eye,
  Lock,
  Unlock,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { ScriptCopyBtn } from '../magicui/script-copy-btn';

interface RepoDetailDialogProps {
  repo: GitHubRepo | null;
  isOpen: boolean;
  onClose: () => void;
}

const RepoDetailDialog: FC<RepoDetailDialogProps> = ({ repo, isOpen, onClose }) => {
  if (!repo) return null;
  const customCommandMap = {
    HTTPS: repo.clone_url,
    SSh: repo.ssh_url,
    git: repo.git_url,
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Github className="h-6 w-6 text-accent" />
            {repo.name}
            <div className="text-sm px-2 py-1 rounded-full bg-secondary flex items-center gap-1">
              {repo.private ? (
                <>
                  <Lock className="h-3 w-3" /> Private
                </>
              ) : (
                <>
                  <Unlock className="h-3 w-3" /> Public
                </>
              )}
            </div>
          </DialogTitle>
          <DialogDescription className="text-base text-card-foreground mt-2">
            {repo.description || 'No description provided'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-4 bg-secondary/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Repository Details</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-accent" />
                <span className="font-medium">Language:</span> {repo.language || 'Not specified'}
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="font-medium">Stars:</span> {repo.stargazers_count}
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-green-500" />
                <span className="font-medium">Forks:</span> {repo.forks_count}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Watchers:</span> {repo.watchers_count}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Full Name:</span> {repo.full_name}
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-secondary/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Repository Links</h3>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" /> View on GitHub
                </a>
              </Button>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="w-full px-3 py-2 justify-start border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground">
                    <Code className="h-4 w-4" /> Clone Repository
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col justify-center">
                    <ScriptCopyBtn
                      showMultiplePackageOptions={true}
                      codeLanguage="shell"
                      lightTheme="nord"
                      darkTheme="vitesse-dark"
                      commandMap={customCommandMap}
                      className="self-start "
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RepoDetailDialog;
