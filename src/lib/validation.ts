import * as yup from 'yup';

// Basic validation schemas
export const emailSchema = yup
  .string()
  .email('Please enter a valid email')
  .required('Email is required');
export const passwordSchema = yup
  .string()
  .min(8, 'Password must be at least 8 characters')
  .required('Password is required');
export const nameSchema = yup.string().required('Name is required');

// Common form schemas
export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = yup.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const profileSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string(),
  email: emailSchema,
  bio: yup.string().max(200, 'Bio must be less than 200 characters'),
  country: yup.string().required('Country is required'),
});

export const educationSchema = yup.object({
  college: yup.string(),
  degree: yup.string().required('Degree is required'),
  branch: yup.string().required('Branch is required'),
  graduationYear: yup.string().required('Graduation year is required'),
});

export const socialSchema = yup.object({
  linkedIn: yup.string().url('Please enter a valid URL'),
  github: yup.string().url('Please enter a valid URL'),
  twitter: yup.string().url('Please enter a valid URL'),
  website: yup.string().url('Please enter a valid URL'),
});
