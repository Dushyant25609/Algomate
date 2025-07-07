import { cn } from '@/lib/utils';
import { FaDiscord } from 'react-icons/fa6';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('relative bottom-0 w-screen overflow-hidden', className)}>
      {/* Gradient Background with KROWW text */}
      <div className="w-full overflow-hidden bg-gradient-to-b from-background dark:via-accent dark:to-bright-accent via-accent to-bright-accent">
        {/* Footer Content */}
        <div className="inset-0 flex flex-col justify-between gap-0">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 p-6">
            {/* Stay Connected */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-card-foreground">Stay Connected</h3>
              <div className="flex space-x-4">
                <a href="https://discord.gg/yF2S87QwQS" target="_blank" rel="noreferrer">
                  <FaDiscord />
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-card-foreground">Contact Us</h3>
              <div className="flex">
                <h1 className="text-sm text-card-foreground">connect@kroww.com</h1>
              </div>
            </div>
          </div>
          {/* Logo */}
          <h1 className="text-[40vw] font-long font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b dark:from-bright-accent/50 dark:via-bright-accent/90 dark:to-bright-accent/10 from-card/10 via-card/50 to-card/90 select-none whitespace-nowrap overflow-hidden leading-none text-end p-0 m-0 -mb-20">
            KROWW
          </h1>
          {/* Bottom Bar */}
          <div className="border-t border-white/10 border-solid w-full py-4 mt-0">
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <p className="text-xs text-card-foreground/60">
                &copy; {new Date().getFullYear()} KROWW. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
