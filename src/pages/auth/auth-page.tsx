import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthPage: FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/auth/connect' || (!isAuthenticated && location.pathname !== '/')) {
      setIsOpen(true);
    }
  }, [isAuthenticated, location.pathname]);

  // Get the previous location from state or default to home
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleGoogleAuth = () => {
    dispatch({ type: 'auth/google' });
  };

  const handleGithubAuth = () => {
    dispatch({ type: 'auth/github' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onCloseNavigate={'/'} className="sm:max-w-md">
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              when: 'beforeChildren',
              staggerChildren: 0.1,
            }}
            className="w-full"
          >
            <Card className="gap-12 border-none shadow-none">
              <CardHeader>
                <h1 className="text-2xl font-bold tracking-tight text-center mt-4">
                  Welcome to Algomate
                </h1>
                <CardDescription className="text-center">
                  Sign in to continue your journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3.5">
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 24,
                    }}
                    whileHover={{
                      scale: 1.02,
                      transition: { type: 'spring', stiffness: 400, damping: 10 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleGithubAuth}
                      className="w-full flex items-center justify-center gap-3 hover:bg-accent/30 hover:border-primary/30 transition-all duration-200"
                    >
                      <Github className="w-5 h-5" />
                      GitHub
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 24,
                      delay: 0.1,
                    }}
                    whileHover={{
                      scale: 1.02,
                      transition: { type: 'spring', stiffness: 400, damping: 10 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleGoogleAuth}
                      className="w-full flex items-center justify-center gap-3 hover:bg-accent/30 hover:border-primary/30 transition-all duration-200"
                    >
                      <Mail className="w-5 h-5" />
                      Google
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-center text-xs text-muted-foreground/80"
                >
                  By continuing, you agree to our Terms and Privacy Policy
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
