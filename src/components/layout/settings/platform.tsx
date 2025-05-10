import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User } from '@/interface/user';
import { FC, useState, useEffect, useContext } from 'react';
import leetcode from '@/assets/leetcode.svg';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  DeletePlatform,
  PlatformGenerateAction,
  PlatformVerifyAction,
  clearVerification,
} from '@/store/slices/platformSlice';
import { CheckCircle, Trash2, PlusCircle, Github } from 'lucide-react';
import { Loader } from '@/components/ui/loader';
import { toast } from 'sonner';
import VerificationDialog from '@/components/ui/verification-dialog';
import ConfirmationDialog from '@/components/ui/confirmation-dialog';
import leetcodeLight from '@/assets/leetcodeLight.svg';
import { ThemeProviderContext } from '@/provider/theme-provider';

interface PlatformTabProps {
  user: User;
}

export const PlatformTab: FC<PlatformTabProps> = ({ user }) => {
  const { theme } = useContext(ThemeProviderContext);
  const dispatch = useAppDispatch();
  const { loading, verificationCode, instructions, error } = useAppSelector(
    state => state.platform.verification
  );
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [platformUsernames, setPlatformUsernames] = useState({
    leetcode: user.platforms?.leetcode || '',
    codeforces: user.platforms?.codeforces || '',
    codechef: user.platforms?.codechef || '',
    gfg: user.platforms?.gfg || '',
    codeStudio: user.platforms?.codeStudio || '',
  });
  const [verifiedPlatforms, setVerifiedPlatforms] = useState({
    leetcode: !!user.platforms?.leetcode,
    codeforces: !!user.platforms?.codeforces,
    codechef: !!user.platforms?.codechef,
    gfg: !!user.platforms?.gfg,
    codeStudio: !!user.platforms?.codeStudio,
  });
  const [verifyPlatform, setVerifyPlatform] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    platform: '',
  });

  const handleInputChange = (platform: string, value: string) => {
    setPlatformUsernames(prev => ({
      ...prev,
      [platform]: value,
    }));
    // Make sure we don't accidentally set verified status when typing
    if (!verifiedPlatforms[platform as keyof typeof verifiedPlatforms]) {
      setVerifiedPlatforms(prev => ({
        ...prev,
        [platform]: false,
      }));
    }
  };

  const handleGenerateVerification = (platform: string) => {
    if (!platformUsernames[platform as keyof typeof platformUsernames]) {
      toast.error(`Please enter your ${platform} username first`);
      return;
    }
    setSelectedPlatform(platform);
    setVerifyPlatform(platform);
    dispatch(PlatformGenerateAction(platformUsernames[platform as keyof typeof platformUsernames]));
  };

  // We no longer need the edit mode since we're showing the input directly
  // when the user doesn't have a platform ID

  const handleDeletePlatform = (platform: string) => {
    setConfirmDialog({
      isOpen: true,
      platform,
    });
  };

  const confirmDelete = () => {
    const platform = confirmDialog.platform;
    setPlatformUsernames(prev => ({
      ...prev,
      [platform]: '',
    }));
    setVerifiedPlatforms(prev => ({
      ...prev,
      [platform]: false,
    }));
    toast.success(`${platform} has been removed`);
    setConfirmDialog({
      isOpen: false,
      platform: '',
    });
    dispatch(
      DeletePlatform({ [platform]: platformUsernames[platform as keyof typeof platformUsernames] })
    );
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({
      isOpen: false,
      platform: '',
    });
  };

  const handleVerify = () => {
    if (verifyPlatform) {
      const username = platformUsernames[verifyPlatform as keyof typeof platformUsernames];
      dispatch(PlatformVerifyAction(username));
    }

    // The platform will be marked as verified when the API response is successful
    // This is handled in the useEffect below
  };

  const handleGithubAuth = () => {
    dispatch({ type: 'auth/github' });
  };

  // Listen for changes in the verification state
  useEffect(() => {
    // When loading becomes false after a verification attempt and there's no error
    if (!loading && selectedPlatform && !error && !verificationCode) {
      // Mark the platform as verified
      toast.success(`${selectedPlatform} has been verified successfully`);
      setSelectedPlatform(null);
    }
  }, [error, loading, selectedPlatform, verificationCode]);

  const handleClearVerification = () => {
    setSelectedPlatform(null);
    dispatch(clearVerification());
  };
  return (
    <Card className="shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6">
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">{error}</div>
          )}

          <VerificationDialog
            isOpen={!!verificationCode}
            onClose={handleClearVerification}
            onVerify={handleVerify}
            verificationCode={verificationCode || ''}
            instructions={instructions}
            loading={loading}
            platform={selectedPlatform}
          />

          <ConfirmationDialog
            isOpen={confirmDialog.isOpen}
            onClose={closeConfirmDialog}
            onConfirm={confirmDelete}
            title="Confirm Deletion"
            description={`Are you sure you want to delete ${confirmDialog.platform}?`}
            confirmText="Delete"
            cancelText="Cancel"
          />

          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={handleGithubAuth}
                className="w-full md:w-fit flex items-center justify-center gap-3 hover:bg-accent/30 hover:border-primary/30 transition-all duration-200"
              >
                <Github className="w-5 h-5" />
                GitHub
              </Button>
              {user.githubToken && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />}
            </div>
            {/* LeetCode Platform */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <img src={theme === 'dark' ? leetcode : leetcodeLight} className="w-4 h-4" alt="" />
                LeetCode
              </label>
              <div className="flex gap-2">
                {/* If user has a verified platform ID, show it with a delete option */}
                {verifiedPlatforms.leetcode ? (
                  <div className="flex w-full gap-4">
                    <div className="flex-1 flex items-center gap-2">
                      <Input
                        value={platformUsernames.leetcode}
                        readOnly
                        placeholder="LeetCode username"
                        className="transition-all focus:border-primary"
                        disabled={loading && selectedPlatform === 'leetcode'}
                      />
                      {verifiedPlatforms.leetcode && (
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePlatform('leetcode')}
                      className="h-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  /* If user doesn't have a platform ID, show input field directly */
                  <div className="flex w-full gap-4">
                    <Input
                      value={platformUsernames['leetcode']}
                      onChange={e => handleInputChange('leetcode', e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleGenerateVerification('leetcode');
                        }
                      }}
                      placeholder="LeetCode username"
                      className="transition-all focus:border-primary"
                      disabled={loading && selectedPlatform === 'leetcode'}
                    />
                    {selectedPlatform === 'leetcode' && verificationCode ? (
                      <Button variant="outline" size="sm" onClick={handleVerify} disabled={loading}>
                        {loading ? <Loader size="sm" /> : 'Verify'}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateVerification('leetcode')}
                        disabled={loading || !platformUsernames.leetcode}
                        className="h-full"
                      >
                        <PlusCircle className="h-4 w-4 mr-1" /> Add
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
