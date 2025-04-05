import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Social } from '@/interface/social';
import { User } from '@/interface/user';
import { FormikProps, withFormik } from 'formik';
import { FC } from 'react';
import { toast } from 'sonner';

interface SocialTabProps {
  user: User;
  onSubmit: (social: Partial<User>) => void;
}

const SocialsTab: FC<SocialTabProps & FormikProps<Social>> = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <Card className="shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Socials</h2>
            <p className="text-muted-foreground text-sm">Manage your social media profiles.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  LinkedIn
                </label>
                <Input
                  name="linkedIn"
                  value={values.linkedIn || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="https://linkedin.com/in/username"
                  className="transition-all focus:border-primary"
                />
                {touched.linkedIn && errors.linkedIn && (
                  <div className="text-xs text-red-500">{errors.linkedIn}</div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  Twitter
                </label>
                <Input
                  name="x"
                  value={values.x || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="https://twitter.com/username"
                  className="transition-all focus:border-primary"
                />
                {touched.x && errors.x && <div className="text-xs text-red-500">{errors.x}</div>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                  Portfolio
                </label>
                <Input
                  name="portfolio"
                  value={values.portfolio || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="https://yourportfolio.com"
                  className="transition-all focus:border-primary"
                />
                {touched.portfolio && errors.portfolio && (
                  <div className="text-xs text-red-500">{errors.portfolio}</div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                Update
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

const FormikSocial = withFormik<SocialTabProps, Social>({
  mapPropsToValues: props => ({
    linkedIn: props.user.social.linkedIn || '',
    github: props.user.social.gitHub || '',
    x: props.user.social.x || '',
    portfolio: props.user.social.portfolio || '',
  }),
  validate: values => {
    const errors: Partial<Record<keyof Social, string>> = {};

    // LinkedIn validation
    if (values.linkedIn && !isValidUrl(values.linkedIn)) {
      errors.linkedIn = 'Please enter a valid LinkedIn URL';
    }

    // Twitter/X validation
    if (values.x && !isValidUrl(values.x)) {
      errors.x = 'Please enter a valid Twitter URL';
    }

    // Portfolio validation
    if (values.portfolio && !isValidUrl(values.portfolio)) {
      errors.portfolio = 'Please enter a valid portfolio URL';
    }

    return errors;
  },
  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit({ social: values });
    setSubmitting(false);
  },
})(SocialsTab);

// Helper function to validate URLs
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    toast.error('Invalid URL');
    console.error(error);
    return false;
  }
};

export default FormikSocial;
