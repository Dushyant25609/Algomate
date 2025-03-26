import * as React from 'react';
import { Formik, FormikConfig, FormikValues, FormikProps, useFormikContext } from 'formik';
import {
  Form as FormComponent,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { FieldValues, Path } from 'react-hook-form';
import * as yup from 'yup';

// FormikForm component that wraps Formik with the existing Form component
export const FormikForm = <TFormValues extends FormikValues = FormikValues>({
  children,
  ...props
}: FormikConfig<TFormValues> & { children: React.ReactNode }) => {
  return (
    <Formik {...props}>
      {formikProps => (
        <FormikFormProvider formikProps={formikProps}>
          <FormComponent>{children}</FormComponent>
        </FormikFormProvider>
      )}
    </Formik>
  );
};

// Context provider to make Formik props available throughout the form
interface FormikFormProviderProps<TFormValues extends FormikValues = FormikValues> {
  formikProps: FormikProps<TFormValues>;
  children: React.ReactNode;
}

const FormikFormContext = React.createContext<FormikProps<any> | undefined>(undefined);

export const FormikFormProvider = <TFormValues extends FormikValues = FormikValues>({
  formikProps,
  children,
}: FormikFormProviderProps<TFormValues>) => {
  return <FormikFormContext.Provider value={formikProps}>{children}</FormikFormContext.Provider>;
};

// Hook to access Formik context
export const useFormikFormContext = () => {
  const context = React.useContext(FormikFormContext);
  if (!context) {
    throw new Error('useFormikFormContext must be used within a FormikFormProvider');
  }
  return context;
};

// FormikField component that integrates with the existing FormField
interface FormikFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: string;
  children: React.ReactNode;
}

export const FormikField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  children,
}: FormikFieldProps<TFieldValues>) => {
  const formik = useFormikContext();

  return (
    <FormField
      name={name as Path<TFieldValues>}
      control={
        {
          field: {
            onChange: (e: React.ChangeEvent<any>) => {
              formik.handleChange(e);
            },
            onBlur: () => {
              formik.handleBlur(name);
            },
            value: formik.values[name],
            name,
          },
          formState: {
            errors: {
              [name]: formik.errors[name] ? { message: formik.errors[name] } : undefined,
            },
            touchedFields: {
              [name]: formik.touched[name],
            },
          },
        } as any
      }
      render={() => children}
    />
  );
};

// Export Yup for schema validation
export { yup };

// Re-export form components for convenience
export { FormItem, FormLabel, FormControl, FormDescription, FormMessage };
