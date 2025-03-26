import { SearchResponse, User, UserUpdate } from '@/interface/user';
import {
  searchSuccess,
  searchFailure,
  updateUserSuccess,
  UpdateUserAction,
  AcceptRequestAction,
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
} from '../slices/profileSlices';
import { Profile, PublicProfile } from '@/interface/profile';
import { PayloadAction } from '@reduxjs/toolkit';

type AuthSagaEffect =
  | CallEffect<Profile | User>
  | PutEffect<{ type: string; payload: User | Profile | string }>;

type SearchUserSagaEffect =
  | CallEffect<SearchResponse>
  | PutEffect<{ type: string; payload: SearchResponse | string }>;

type PublicProfileSagaEffect =
  | CallEffect<PublicProfile | UserServiceError>
  | PutEffect<{ type: string; payload: PublicProfile | string | UserServiceError }>;

type UnsendRequestSagaEffect = CallEffect<void> | PutEffect<{ type: string; payload: string }>;

export function* getUserDataSaga(): Generator<AuthSagaEffect, void, User> {
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
}

export function* getProfileSaga(): Generator<AuthSagaEffect, void, Profile> {
  try {
    const profileData: Profile = yield call(userService.getUserProfile);
    yield put(profileSuccess(profileData));
  } catch (error) {
    let errorMessage = 'Failed to fetch user data';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(loginFailure(errorMessage));
  }
}

function* PublicProfileSaga(
  action: PayloadAction<string>
): Generator<PublicProfileSagaEffect, void, PublicProfile | string> {
  try {
    const userData = yield call(userService.getPublicUserProfile, action.payload);
    yield put(publicProfileSuccess(userData as PublicProfile));
  } catch (error) {
    let errorMessage = 'Failed to fetch user data';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(profileFailure(errorMessage));
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
}

function* updateUserSaga(action: PayloadAction<UserUpdate>) {
  try {
    yield call(userService.updateUser, action.payload);
    yield put(updateUserSuccess());
  } catch (error) {
    let errorMessage = 'Failed to update user';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(searchFailure(errorMessage));
  }
}

function* AcceptRequestSaga(action: PayloadAction<string>) {
  // TODO: Implement AcceptRequestSaga
  try {
    yield call(userService.acceptFriendRequest, action.payload);
  } catch (error) {
    let errorMessage = 'Failed to accept friend request';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(searchFailure(errorMessage));
  }
}

function* sendRequestSaga(action: PayloadAction<string>) {
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
}

export function* userSaga() {
  yield takeLatest(loginRequest.type, getUserDataSaga);
  yield takeLatest(profileRequest.type, getProfileSaga);
  yield takeLatest(GetPublicProfile().type, PublicProfileSaga);
  yield debounce(300, SearchAction().type, SearchSaga);
  yield takeLatest(UnsendRequestAction().type, unsendRequestSaga);
  yield takeLatest(UpdateUserAction().type, updateUserSaga);
  yield takeLatest(AcceptRequestAction().type, AcceptRequestSaga);
  yield takeLatest(SendRequestAction().type, sendRequestSaga);
}
