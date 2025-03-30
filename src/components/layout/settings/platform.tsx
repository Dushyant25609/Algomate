import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User } from '@/interface/user';
import { FC, useState, useEffect } from 'react';
import leetcode from '@/assets/leetcode.svg';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  DeletePlatform,
  PlatformGenerateAction,
  PlatformVerifyAction,
  clearVerification,
} from '@/store/slices/platformSlice';
import { Edit, CheckCircle, Trash2, X, PlusCircle, Github } from 'lucide-react';
import { Loader } from '@/components/ui/loader';
import { toast } from 'sonner';
import VerificationDialog from '@/components/ui/verification-dialog';
import ConfirmationDialog from '@/components/ui/confirmation-dialog';

interface PlatformTabProps {
  user: User;
}

export const PlatformTab: FC<PlatformTabProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const { loading, verificationCode, message, instructions, error } = useAppSelector(
    state => state.platform.verification
  );
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<string | null>(null);
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
  const [tempUsername, setTempUsername] = useState('');
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
  };

  const handleGenerateVerification = (platform: string) => {
    if (!platformUsernames[platform as keyof typeof platformUsernames]) {
      toast.error(`Please enter your ${platform} username first`);
      return;
    }
    setVerifyPlatform(platform);
    dispatch(PlatformGenerateAction(platformUsernames[platform as keyof typeof platformUsernames]));
  };

  const handleEditClick = (platform: string) => {
    setEditMode(platform);
    setSelectedPlatform(null);
    dispatch(clearVerification());
    setTempUsername(platformUsernames[platform as keyof typeof platformUsernames]);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
  };

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
      setVerifiedPlatforms(prev => ({
        ...prev,
        [selectedPlatform]: true,
      }));
      toast.success(`${selectedPlatform} has been verified successfully`);
      setEditMode(null);
      setSelectedPlatform(null);
    }
  }, [loading, error, verificationCode, selectedPlatform]);

  const handleClearVerification = () => {
    setSelectedPlatform(null);
    setEditMode(null);
    dispatch(clearVerification());
  };
  return (
    <Card className="shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Platform</h2>
            <p className="text-muted-foreground text-sm">Connect your coding platforms.</p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">{error}</div>
          )}

          <VerificationDialog
            isOpen={!!verificationCode}
            onClose={handleClearVerification}
            onVerify={handleVerify}
            verificationCode={verificationCode || ''}
            message={message}
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
            <Button
              variant="outline"
              size="lg"
              onClick={handleGithubAuth}
              className="w-full md:w-fit flex items-center justify-center gap-3 hover:bg-accent/30 hover:border-primary/30 transition-all duration-200"
            >
              <Github className="w-5 h-5" />
              GitHub
            </Button>
            {/* LeetCode Platform */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <img src={leetcode} className="w-4 h-4" alt="" />
                LeetCode
              </label>
              <div className="flex gap-2">
                {editMode === 'leetcode' ? (
                  <Input
                    value={platformUsernames['leetcode']}
                    onChange={e => handleInputChange('leetcode', e.target.value)}
                    placeholder="LeetCode username"
                    className="transition-all focus:border-primary"
                    disabled={loading && selectedPlatform === 'leetcode'}
                  />
                ) : (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={platformUsernames.leetcode}
                      readOnly
                      placeholder="LeetCode username"
                      className="transition-all focus:border-primary"
                      disabled={loading && selectedPlatform === 'leetcode'}
                    />
                    {platformUsernames.leetcode && verifiedPlatforms.leetcode && (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                )}
                {editMode === 'leetcode' ? (
                  <div className="flex gap-2">
                    {selectedPlatform === 'leetcode' && verificationCode ? (
                      <Button variant="outline" size="sm" onClick={handleVerify} disabled={loading}>
                        {loading ? <Loader size="sm" /> : 'Verify'}
                      </Button>
                    ) : (
                      <>
                        {!verificationCode ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGenerateVerification('leetcode')}
                            disabled={loading}
                            className="h-full"
                          >
                            <PlusCircle className="h-4 w-4 mr-1" /> Add
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                            disabled={loading}
                            className="h-full"
                          >
                            <X className="h-4 w-4 mr-1" /> Cancel
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {!platformUsernames.leetcode ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick('leetcode')}
                        className="h-full"
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePlatform('leetcode')}
                        className="h-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CodeForces Platform */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-sm">
                  CF
                </div>
                CodeForces
              </label>
              <div className="flex gap-2">
                {editMode === 'codeforces' ? (
                  <Input
                    value={tempUsername}
                    onChange={e => setTempUsername(e.target.value)}
                    placeholder="CodeForces username"
                    className="transition-all focus:border-primary"
                    disabled={loading && selectedPlatform === 'codeforces'}
                  />
                ) : (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={platformUsernames.codeforces}
                      readOnly
                      placeholder="CodeForces username"
                      className="transition-all focus:border-primary"
                      disabled={loading && selectedPlatform === 'codeforces'}
                    />
                    {platformUsernames.codeforces && verifiedPlatforms.codeforces && (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                )}
                {editMode === 'codeforces' ? (
                  <div className="flex gap-2">
                    {selectedPlatform === 'codeforces' && verificationCode ? (
                      <Button variant="outline" size="sm" onClick={handleVerify} disabled={loading}>
                        {loading ? <Loader size="sm" /> : 'Verify'}
                      </Button>
                    ) : (
                      <>
                        {!verificationCode ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGenerateVerification('codeforces')}
                            disabled={loading}
                            className="h-full"
                          >
                            <PlusCircle className="h-4 w-4 mr-1" /> Add
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                            disabled={loading}
                            className="h-full"
                          >
                            <X className="h-4 w-4 mr-1" /> Cancel
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {!platformUsernames.codeforces ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick('codeforces')}
                        className="h-full"
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePlatform('codeforces')}
                        className="h-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CodeChef Platform */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center text-xs font-bold bg-amber-600 text-white rounded-sm">
                  CC
                </div>
                CodeChef
              </label>
              <div className="flex gap-2">
                {editMode === 'codechef' ? (
                  <Input
                    value={tempUsername}
                    onChange={e => setTempUsername(e.target.value)}
                    placeholder="CodeChef username"
                    className="transition-all focus:border-primary"
                    disabled={loading && selectedPlatform === 'codechef'}
                  />
                ) : (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={platformUsernames.codechef}
                      readOnly
                      placeholder="CodeChef username"
                      className="transition-all focus:border-primary"
                      disabled={loading && selectedPlatform === 'codechef'}
                    />
                    {platformUsernames.codechef && verifiedPlatforms.codechef && (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                )}
                {editMode === 'codechef' ? (
                  <div className="flex gap-2">
                    {selectedPlatform === 'codechef' && verificationCode ? (
                      <Button variant="outline" size="sm" onClick={handleVerify} disabled={loading}>
                        {loading ? <Loader size="sm" /> : 'Verify'}
                      </Button>
                    ) : (
                      <>
                        {!verificationCode ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGenerateVerification('codechef')}
                            disabled={loading}
                            className="h-full"
                          >
                            <PlusCircle className="h-4 w-4 mr-1" /> Add
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                            disabled={loading}
                            className="h-full"
                          >
                            <X className="h-4 w-4 mr-1" /> Cancel
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {!platformUsernames.codechef ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick('codechef')}
                        className="h-full"
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePlatform('codechef')}
                        className="h-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* GeeksForGeeks Platform */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center text-xs font-bold bg-green-600 text-white rounded-sm">
                  G
                </div>
                GeeksForGeeks
              </label>
              <div className="flex gap-2">
                {editMode === 'gfg' ? (
                  <Input
                    value={tempUsername}
                    onChange={e => setTempUsername(e.target.value)}
                    placeholder="GeeksForGeeks username"
                    className="transition-all focus:border-primary"
                    disabled={loading && selectedPlatform === 'gfg'}
                  />
                ) : (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={platformUsernames.gfg}
                      readOnly
                      placeholder="GeeksForGeeks username"
                      className="transition-all focus:border-primary"
                      disabled={loading && selectedPlatform === 'gfg'}
                    />
                    {platformUsernames.gfg && verifiedPlatforms.gfg && (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                )}
                {editMode === 'gfg' ? (
                  <div className="flex gap-2">
                    {selectedPlatform === 'gfg' && verificationCode ? (
                      <Button variant="outline" size="sm" onClick={handleVerify} disabled={loading}>
                        {loading ? <Loader size="sm" /> : 'Verify'}
                      </Button>
                    ) : (
                      <>
                        {!verificationCode ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGenerateVerification('gfg')}
                            disabled={loading}
                            className="h-full"
                          >
                            <PlusCircle className="h-4 w-4 mr-1" /> Add
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                            disabled={loading}
                            className="h-full"
                          >
                            <X className="h-4 w-4 mr-1" /> Cancel
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {!platformUsernames.gfg ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick('gfg')}
                        className="h-full"
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePlatform('gfg')}
                        className="h-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CodeStudio Platform */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center text-xs font-bold bg-blue-600 text-white rounded-sm">
                  CS
                </div>
                CodeStudio
              </label>
              <div className="flex gap-2">
                {editMode === 'codeStudio' ? (
                  <Input
                    value={tempUsername}
                    onChange={e => setTempUsername(e.target.value)}
                    placeholder="CodeStudio username"
                    className="transition-all focus:border-primary"
                    disabled={loading && selectedPlatform === 'codeStudio'}
                  />
                ) : (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={platformUsernames.codeStudio}
                      readOnly
                      placeholder="CodeStudio username"
                      className="transition-all focus:border-primary"
                      disabled={loading && selectedPlatform === 'codeStudio'}
                    />
                    {platformUsernames.codeStudio && verifiedPlatforms.codeStudio && (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                )}
                {editMode === 'codeStudio' ? (
                  <div className="flex gap-2">
                    {selectedPlatform === 'codeStudio' && verificationCode ? (
                      <Button variant="outline" size="sm" onClick={handleVerify} disabled={loading}>
                        {loading ? <Loader size="sm" /> : 'Verify'}
                      </Button>
                    ) : (
                      <>
                        {!verificationCode ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGenerateVerification('codeStudio')}
                            disabled={loading}
                            className="h-full"
                          >
                            <PlusCircle className="h-4 w-4 mr-1" /> Add
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                            disabled={loading}
                            className="h-full"
                          >
                            <X className="h-4 w-4 mr-1" /> Cancel
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {!platformUsernames.codeStudio ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick('codeStudio')}
                        className="h-full"
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePlatform('codeStudio')}
                        className="h-full"
                      >
                        <Trash2 className="h-4 w-4" />
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
