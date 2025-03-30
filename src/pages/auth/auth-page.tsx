import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { useAppDispatch } from '@/store';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export const AuthPage: FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const handleGoogleAuth = () => {
    dispatch({ type: 'auth/google' });
  };

  const handleGithubAuth = () => {
    dispatch({ type: 'auth/github' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden">
          Open Auth
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full"
        >
          <Card className="gap-12 border-none shadow-none">
            <CardHeader>
              <h1 className="text-2xl font-bold tracking-tight text-center mt-4">Welcome to LBP</h1>
              <CardDescription className="text-center">
                Sign in to continue your journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3.5">
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleGithubAuth}
                  className="w-full flex items-center justify-center gap-3 hover:bg-accent/30 hover:border-primary/30 transition-all duration-200"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleGoogleAuth}
                  className="w-full flex items-center justify-center gap-3 hover:bg-accent/30 hover:border-primary/30 transition-all duration-200"
                >
                  <Mail className="w-5 h-5" />
                  Google
                </Button>
              </div>

              <div className="text-center text-xs text-muted-foreground/80">
                By continuing, you agree to our Terms and Privacy Policy
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
