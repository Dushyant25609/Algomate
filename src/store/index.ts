import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/userSlice';
import rootSaga from './sagas';
import avatarReducer from './slices/avatarSlice';
import profileReducer from './slices/profileSlices';
import platformReducer from './slices/platformSlice';
import countryReducer from './slices/countrySlice';
import leaderboardReducer from './slices/leaderboardSlice';
import friendReducer from './slices/friendSlices';
// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// The store will be configured here
export const store = configureStore({
  reducer: {
    user: userReducer,
    avatar: avatarReducer,
    profile: profileReducer,
    platform: platformReducer,
    country: countryReducer,
    leaderboard: leaderboardReducer,
    friend: friendReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
