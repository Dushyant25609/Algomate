import { SearchResponse, User, UserUpdate } from '@/interface/user';
import {
  searchSuccess,
  searchFailure,
  updateUserSuccess,
  UpdateUserAction,
  AcceptRequestAction,
  updateUserFailure,
} from '../slices/userSlice';
import userService, { UserServiceError } from '@/services/userService';
import { call, CallEffect, debounce, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  loginSuccess,
  loginFailure,
  loginRequest,
  SearchAction,
  UnsendRequestAction,
  SendRequestAction,
} from '../slices/userSlice';
import {
  GetPublicProfile,
  profileFailure,
  profileRequest,
  profileSuccess,
  publicProfileSuccess,
  updateProfileRequest,
  updateProfileSuccess,
} from '../slices/profileSlices';
import { Profile, PublicProfile, updateProfile } from '@/interface/profile';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { setLoading } from '../slices/loadingSlice';

type AuthSagaEffect =
  | CallEffect<Profile | User>
  | PutEffect<{ type: string; payload: User | Profile | string | boolean }>;

type SearchUserSagaEffect =
  | CallEffect<SearchResponse>
  | PutEffect<{ type: string; payload: SearchResponse | string | boolean }>;

type PublicProfileSagaEffect =
  | CallEffect<PublicProfile | UserServiceError>
  | PutEffect<{ type: string; payload: PublicProfile | string | UserServiceError | boolean }>;

type UpdateProfileSagaEffect =
  | CallEffect<updateProfile | UserServiceError | void>
  | PutEffect<{ type: string; payload: updateProfile | string | UserServiceError | boolean }>
  | string
  | number;

type UpdateUserSagaEffect =
  | CallEffect<Partial<User> | UserServiceError | void>
  | PutEffect<{ type: string; payload: void | string | UserServiceError | boolean }>;

type UnsendRequestSagaEffect =
  | CallEffect<void>
  | PutEffect<{ type: string; payload: string | boolean }>;

export function* getUserDataSaga(): Generator<AuthSagaEffect, void, User> {
  yield put(setLoading(true));
  try {
    const userData: User = yield call(userService.getUserData);
    yield put(loginSuccess(userData));
  } catch (error) {
    let errorMessage = 'Failed to fetch user data';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }

    yield put(loginFailure(errorMessage));
  }
  yield put(setLoading(false));
}

export function* getProfileSaga(): Generator<AuthSagaEffect, void, Profile> {
  yield put(setLoading(true));
  try {
    const profileData: Profile = yield call(userService.getUserProfile);
    yield put(profileSuccess(profileData));
  } catch (error) {
    let errorMessage = 'Failed to fetch user data';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(profileFailure(errorMessage));
  }
  yield put(setLoading(false));
}

function* PublicProfileSaga(
  action: PayloadAction<string>
): Generator<PublicProfileSagaEffect, void, PublicProfile | string> {
  yield put(setLoading(true));
  try {
    const userData = yield call(userService.getPublicUserProfile, action.payload);
    yield put(publicProfileSuccess(userData as PublicProfile));
    yield put(setLoading(false));
  } catch (error) {
    let errorMessage = 'Failed to fetch user data';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(profileFailure(errorMessage));
    yield put(setLoading(false));
  }
}

export function* SearchSaga(
  action: PayloadAction<string>
): Generator<SearchUserSagaEffect, void, SearchResponse> {
  try {
    const searchResponse: SearchResponse = yield call(userService.searchUsers, action.payload);
    yield put(searchSuccess(searchResponse));
  } catch (error) {
    let errorMessage = 'Failed to search users';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(searchFailure(errorMessage));
  }
}

export function* unsendRequestSaga(
  action: PayloadAction<string>
): Generator<UnsendRequestSagaEffect, void, void> {
  yield put(setLoading(true));
  try {
    yield call(userService.unsendFriendRequest, action.payload);
    // Removed window.location.reload() as we're handling refresh in the component
  } catch (error) {
    let errorMessage = 'Failed to unsend friend request';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(searchFailure(errorMessage));
  }
  yield put(setLoading(false));
}

function* updateUserSaga(
  action: PayloadAction<UserUpdate>
): Generator<UpdateUserSagaEffect, void, void> {
  yield put(setLoading(true));
  try {
    yield call(userService.updateUser, action.payload);
    yield put(updateUserSuccess());
    yield put(loginRequest());
  } catch (error) {
    let errorMessage = 'Failed to update user';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(searchFailure(errorMessage));
  }
  yield put(setLoading(false));
}

function* AcceptRequestSaga(action: PayloadAction<string>) {
  // TODO: Implement AcceptRequestSaga
  yield put(setLoading(true));
  try {
    yield call(userService.acceptFriendRequest, action.payload);
  } catch (error) {
    let errorMessage = 'Failed to accept friend request';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(searchFailure(errorMessage));
  }
  yield put(setLoading(false));
}

function* sendRequestSaga(action: PayloadAction<string>) {
  yield put(setLoading(true));
  try {
    yield call(userService.sendFriendRequest, action.payload);
    // Refresh user data after sending request
    yield put(loginRequest());
  } catch (error) {
    let errorMessage = 'Failed to send friend request';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(searchFailure(errorMessage));
  }
  yield put(setLoading(false));
}

function* updateUserProfileSaga(
  action: PayloadAction<string>
): Generator<UpdateProfileSagaEffect, void, updateProfile> {
  yield put(setLoading(true));
  try {
    const response = yield call(userService.updateProfile, action.payload);
    yield toast.success('Profile updated successfully');
    yield put(updateProfileSuccess(response));
  } catch (error) {
    let errorMessage = 'Failed to update user profile';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(updateUserFailure(errorMessage));
  }
  yield put(setLoading(false));
}

export function* userSaga() {
  yield takeLatest(loginRequest.type, getUserDataSaga);
  // Removed duplicate line: yield takeLatest(loginRequest.type, getUserDataSaga);
  yield takeLatest(profileRequest.type, getProfileSaga);
  yield takeLatest(GetPublicProfile().type, PublicProfileSaga);
  yield debounce(300, SearchAction().type, SearchSaga);
  yield takeLatest(UnsendRequestAction().type, unsendRequestSaga);
  yield takeLatest(UpdateUserAction().type, updateUserSaga);
  yield takeLatest(AcceptRequestAction().type, AcceptRequestSaga);
  yield takeLatest(SendRequestAction().type, sendRequestSaga);
  yield takeLatest(updateProfileRequest().type, updateUserProfileSaga);
}
