import UserAvatar from '@/components/ui/avatar/user-avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User } from '@/interface/user';
import { Cog } from 'lucide-react';
import { FC } from 'react';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';

interface BasicInfoTabProps {
  user: User;
  country: string[];
  onSubmit?: (values: User) => void;
}

const BasicInfoTab: FC<BasicInfoTabProps & FormikProps<User>> = ({
  user,
  country,
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
          <div className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="relative">
                  <UserAvatar classname="w-20 h-20 sm:w-28 sm:h-28" />
                  <button className="absolute bottom-0 right-0 bg-background border border-input rounded-full p-1 shadow-sm hover:bg-accent transition-colors">
                    <Cog className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-1 text-center sm:text-left">
                  <p className="text-sm font-medium flex flex-col">
                    Algomate Id: <span className="text-primary">{user.username || 'username'}</span>
                  </p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    Full Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="transition-all focus:border-primary"
                  />
                  {touched.name && errors.name && (
                    <div className="text-red-500 text-xs mt-1">{errors.name as string}</div>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium">Bio (Max 100 Characters)</label>
                <textarea
                  name="bio"
                  value={values.bio || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px] transition-all focus:border-primary"
                  maxLength={100}
                  placeholder="Tell us about yourself"
                />
                {touched.bio && errors.bio && (
                  <div className="text-red-500 text-xs mt-1">{errors.bio as string}</div>
                )}
              </div>
              <div className="">
                <h3 className="text-lg font-medium">Educational Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      Country <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Select
                      name="country"
                      value={values.country}
                      onValueChange={value => {
                        handleChange({
                          target: { name: 'country', value },
                        } as React.ChangeEvent<HTMLInputElement>);
                      }}
                    >
                      <SelectTrigger className="w-full h-10">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {country.map(country => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {touched.country && errors.country && (
                      <div className="text-red-500 text-xs mt-1">{errors.country as string}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="city"
                      value={values.city || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your college name"
                    />
                    {touched.city && errors.city && (
                      <div className="text-red-500 text-xs mt-1">{errors.city as string}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      College <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="college"
                      value={values.college || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your college name"
                    />
                    {touched.college && errors.college && (
                      <div className="text-red-500 text-xs mt-1">{errors.college as string}</div>
                    )}
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <label className="text-sm font-medium">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="company"
                      value={values.company || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your company name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {touched.company && errors.company && (
                      <div className="text-red-500 text-xs mt-1">{errors.company as string}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button variant={'outline'} type="submit" disabled={isSubmitting}>
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string(),
  country: Yup.string(),
  degree: Yup.string(),
  branch: Yup.string(),
  graduation: Yup.string(),
  bio: Yup.string().max(100, 'Bio must be less than 100 characters'),
});

const FormikSettings = withFormik<BasicInfoTabProps, User>({
  mapPropsToValues: props => ({
    name: props.user.name,
    username: props.user.username,
    email: props.user.email,
    bio: props.user.bio || '',
    country: props.user.country || '',
    college: props.user.college || '',
    company: props.user.company || '',
    city: props.user.city || '',
    // These fields are required by the User interface but not used in this form
    platforms: props.user.platforms,
    social: props.user.social,
    friends: props.user.friends,
  }),
  validationSchema,
  handleSubmit: (values, { setSubmitting, props }) => {
    // Ensure all string fields are empty strings rather than undefined or null
    const sanitizedValues = {
      ...values,
      name: values.name || '',
      username: values.username || '',
      email: values.email || '',
      bio: values.bio || '',
      country: values.country || '',
      college: values.college || '',
      company: values.company || '',
      city: values.city || '',
    };
    if (props.onSubmit) {
      props.onSubmit(sanitizedValues);
    } else {
      console.log('Form values:', sanitizedValues);
    }
    setSubmitting(false);
  },
})(BasicInfoTab);

export default FormikSettings;
