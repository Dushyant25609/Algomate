# Form Validation with Formik and Yup

This project uses Formik for form state management and Yup for schema validation. The integration allows you to use the existing form components with Formik's powerful validation capabilities.

## Basic Usage

```tsx
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Define your validation schema
const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

// Define your initial values
const initialValues = {
  email: '',
  password: '',
};

// Create your form
const MyForm = () => {
  const handleSubmit = values => {
    console.log(values);
    // Handle form submission
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <>
          <FormikField name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" />
              </FormControl>
              <FormDescription>We'll never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          </FormikField>

          <FormikField name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormikField>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </>
      )}
    </FormikForm>
  );
};
```

## Components

### FormikForm

A wrapper around Formik that integrates with the existing Form component.

```tsx
<FormikForm
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {/* Form fields */}
</FormikForm>
```

### FormikField

A wrapper around FormField that connects to Formik's state management.

```tsx
<FormikField name="fieldName">
  <FormItem>{/* Form controls */}</FormItem>
</FormikField>
```

## Validation Schemas

Common validation schemas are available in `@/lib/validation.ts`:

```tsx
import { loginSchema, registerSchema, profileSchema } from '@/lib/validation';

// Use in your form
<FormikForm validationSchema={loginSchema} {...otherProps}>
  {/* Form fields */}
</FormikForm>;
```

## Example

See `@/components/examples/formik-example.tsx` for a complete example of how to use Formik and Yup with the form components.
