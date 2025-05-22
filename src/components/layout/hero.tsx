import { memo, useContext, useEffect, useState } from 'react';
import algomate from '@/assets/algomate.svg';
import algomateDark from '@/assets/algomateLight.svg';
import dashboard from '@/assets/dashboard.png';
import { ThemeProviderContext } from '@/provider/theme-provider';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/lib/routes';
import { motion } from 'framer-motion';
import logo from '@/assets/Logo2.svg';

const HeroSection = () => {
  const { theme } = useContext(ThemeProviderContext);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16 mt-4 md:mt-8 lg:mt-12 relative overflow-hidden">
      <motion.div
        className="absolute top-4 left-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <img src={logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16" />
      </motion.div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
        <motion.div
          className="w-full lg:col-span-2 flex flex-col justify-center space-y-4 md:space-y-6 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -inset-10  rounded-3xl blur-3xl -z-10"></div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-mono font-bold text-foreground tracking-tight drop-shadow-sm">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/90">
              Welcome to
            </span>{' '}
          </h1>
          <motion.img
            className="w-4/5 md:w-3/4 lg:w-3/5 my-2 md:my-3"
            src={theme === 'dark' ? algomateDark : algomate}
            alt="Algomate"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground/90 mt-2 drop-shadow-sm">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-accent/90">
              Code. Connect. Compete
            </span>
          </h2>
          <p className="text-base md:text-lg text-foreground/70 max-w-xl leading-relaxed">
            Compete with friends. Track your growth. Customize your developer identity.
          </p>
          <div className="flex w-full flex-col lg:flex-row items-center gap-3 md:gap-4  md:max-w-md mt-4 md:mt-6">
            <Button
              className="w-full py-6 text-base"
              onClick={() => navigate(AppRoutes.AUTH_CONNECT)}
              variant={'backdrop'}
              size="lg"
            >
              Get Started
            </Button>
            <Button className="w-full py-6 text-base" variant={'outline'} size="lg">
              Connect with Us
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="rounded-lg shadow-xl overflow-hidden mt-8 md:mt-0 border border-border/40"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img className="w-full h-auto rounded-lg object-cover" src={dashboard} alt="dashboard" />
        </motion.div>
      </div>
    </div>
  );
};

export default memo(HeroSection);
