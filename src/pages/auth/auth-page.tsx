import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Mail, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { useAppDispatch } from '@/store';

export const AuthPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleGoogleAuth = () => {
    dispatch({ type: 'auth/google' });
  };

  const handleGithubAuth = () => {
    dispatch({ type: 'auth/github' });
  };

  return (
    <div className="min-h-screen inset-0 absolute z-50 w-full flex items-center justify-center backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-sm mx-4"
      >
        <Card className="gap-12">
          <CardHeader>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                window.location.href = '/'; // Force a reload to ensure proper navigation
              }}
              className="hover:bg-accent/30 cursor-pointer"
            >
              <Home onClick={() => navigate('/')} className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight text-center">Welcome to LBP</h1>
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
    </div>
  );
};
