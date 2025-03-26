import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { copyToClipboard } from '@/lib/hook';

interface VerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  verificationCode: string;
  message: string | null;
  instructions: string | null;
  loading: boolean;
  platform: string | null;
}

const VerificationDialog: FC<VerificationDialogProps> = ({
  isOpen,
  onClose,
  onVerify,
  verificationCode,
  message,
  instructions,
  loading,
  platform,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Verification Required for {platform}</DialogTitle>
          <DialogDescription className="text-sm mt-2">{message}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div
            onClick={() => copyToClipboard(verificationCode)}
            className="bg-background p-3 rounded border text-sm font-mono overflow-x-auto cursor-copy"
          >
            {verificationCode}
          </div>
          <p className="text-sm text-muted-foreground">{instructions}</p>
        </div>

        <DialogFooter className="flex flex-row gap-2 sm:justify-end">
          <Button onClick={onVerify} disabled={loading} className="flex-1 sm:flex-none">
            {loading ? <Loader size="sm" className="mr-2" /> : null}
            Verify
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-none"
            disabled={loading}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;
