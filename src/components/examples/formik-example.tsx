import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  FormikForm,
  FormikField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  yup,
} from '@/components/ui/formik-form';

// Define the form values interface
interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
}

// Create a validation schema using Yup
const profileValidationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string(),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  bio: yup.string().max(200, 'Bio must be less than 200 characters'),
});

// Initial values for the form
const initialValues: ProfileFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
};

const FormikExample: React.FC = () => {
  const handleSubmit = (values: ProfileFormValues) => {
    console.log('Form submitted with values:', values);
    // Here you would typically send the data to your API
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Profile Form</h2>

      <FormikForm
        initialValues={initialValues}
        validationSchema={profileValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <>
            <div className="space-y-4">
              <FormikField name="firstName">
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" />
                  </FormControl>
                  <FormDescription>Your first name as it appears on your ID.</FormDescription>
                  <FormMessage />
                </FormItem>
              </FormikField>

              <FormikField name="lastName">
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormikField>

              <FormikField name="email">
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" />
                  </FormControl>
                  <FormDescription>We'll never share your email with anyone else.</FormDescription>
                  <FormMessage />
                </FormItem>
              </FormikField>

              <FormikField name="bio">
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                      placeholder="Tell us about yourself"
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description about yourself (max 200 characters).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormikField>
            </div>

            <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </>
        )}
      </FormikForm>
    </div>
  );
};

export default FormikExample;
