# Redux Setup in LBP Project

This project uses Redux Toolkit for state management. Here's an overview of how it's set up and how to use it.

## Store Structure

The Redux store is configured in `src/store/index.ts`. It exports:

- `store`: The configured Redux store
- `RootState`: Type representing the complete state tree
- `AppDispatch`: Type for the store's dispatch function
- `useAppDispatch`: Typed hook for accessing dispatch
- `useAppSelector`: Typed hook for selecting state from the store

## Available Slices

### User Slice (`src/store/slices/userSlice.ts`)

Manages user authentication state with the following:

**State Properties:**

- `isAuthenticated`: Boolean indicating if user is logged in
- `username`: User's name when authenticated
- `email`: User's email when authenticated
- `loading`: Loading state for async operations
- `error`: Error message if authentication fails

**Actions:**

- `setLoading`: Set the loading state
- `loginSuccess`: Set user as authenticated with user data
- `loginFailure`: Handle failed authentication
- `logout`: Clear user authentication data

## Using Redux in Components

To use Redux in your components:

```tsx
import { useAppDispatch, useAppSelector } from '@/store';
import { someAction } from '@/store/slices/someSlice';

function MyComponent() {
  // Get data from store
  const data = useAppSelector((state) => state.someSlice.someData);

  // Get dispatch function
  const dispatch = useAppDispatch();

  // Dispatch an action
  const handleSomething = () => {
    dispatch(someAction(payload));
  };

  return (
    // Your component JSX
  );
}
```

## Adding New Slices

To add a new slice to the Redux store:

1. Create a new file in `src/store/slices/`
2. Define your slice using `createSlice` from Redux Toolkit
3. Export the actions and reducer
4. Import and add the reducer to the store configuration in `src/store/index.ts`

Example:

```tsx
// 1. In src/store/slices/newSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewSliceState {
  // Your state properties
}

const initialState: NewSliceState = {
  // Initial values
};

export const newSlice = createSlice({
  name: 'newSlice',
  initialState,
  reducers: {
    // Your reducers
  },
});

export const {
  /* your actions */
} = newSlice.actions;
export default newSlice.reducer;

// 2. In src/store/index.ts
import newReducer from './slices/newSlice';

export const store = configureStore({
  reducer: {
    // Existing reducers
    newSlice: newReducer,
  },
});
```
