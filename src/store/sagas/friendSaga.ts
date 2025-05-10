import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import userService from '@/services/userService';
import {
  fetchUserPendingRequest,
  fetchUserPendingSuccess,
  fetchUserPendingsFailure,
  fetchUserFriendRequest,
  fetchUserFriendSuccess,
  fetchUserFriendFailure,
} from '../slices/friendSlices';
import { PendingRequests, UserFriends } from '@/interface/friend';
import { setLoading } from '../slices/loadingSlice';

// Define saga effect types
type FriendSagaEffect =
  | CallEffect<PendingRequests | UserFriends | void>
  | PutEffect<{ type: string; payload: PendingRequests | UserFriends | string | boolean }>;

// Saga for fetching pending friend requests
function* fetchPendingRequestsSaga(): Generator<FriendSagaEffect, void, PendingRequests> {
  yield put(setLoading(true));
  try {
    const pendingRequests = yield call(userService.getPendingFriendRequests);
    yield put(fetchUserPendingSuccess(pendingRequests));
  } catch (error) {
    let errorMessage = 'Failed to fetch pending friend requests';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(fetchUserPendingsFailure(errorMessage));
  }
  yield put(setLoading(false));
}

// Saga for fetching all friend requests
function* fetchFriendRequestsSaga(): Generator<FriendSagaEffect, void, UserFriends> {
  yield put(setLoading(true));
  try {
    const friendRequests = yield call(userService.getUserFriendRequests);
    yield put(fetchUserFriendSuccess(friendRequests));
  } catch (error) {
    let errorMessage = 'Failed to fetch friend requests';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    yield put(fetchUserFriendFailure(errorMessage));
  }
  yield put(setLoading(false));
}

// Watcher Saga
export function* friendSaga() {
  yield takeLatest(fetchUserPendingRequest.type, fetchPendingRequestsSaga);
  yield takeLatest(fetchUserFriendRequest.type, fetchFriendRequestsSaga);
}
