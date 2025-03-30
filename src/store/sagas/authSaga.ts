import authService from '@/services/authService';
import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { loginFailure, logout as userLogout, setLoading } from '../slices/userSlice';
import { logout as profileLogout } from '../slices/profileSlices';
// Remove the redirect import as we'll use window.location.href instead

export function* GoogleSaga(): Generator<CallEffect<void> | PutEffect, void, void> {
  try {
    yield call(authService.googleAuth);
    localStorage.setItem('cookie', 'true');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Google authentication failed';
    yield put(loginFailure(errorMessage));
  }
}

export function* GithubSaga(): Generator<CallEffect<void> | PutEffect, void, void> {
  try {
    yield call(authService.githubAuth);
    localStorage.setItem('cookie', 'true');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'GitHub authentication failed';
    yield put(loginFailure(errorMessage));
  }
}

export function* LogoutSaga(): Generator<CallEffect<void> | PutEffect, void, void> {
  try {
    yield put(setLoading());
    localStorage.setItem('cookie', 'false');
    yield call(Logout);
    yield call(authService.logout);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Logout failed';
    yield put(loginFailure(errorMessage));
  }
}

export function* Logout(): Generator<CallEffect<void> | PutEffect, void, void> {
  try {
    yield put(profileLogout());
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Logout failed';
    yield put(loginFailure(errorMessage));
  }
}

export function* authSaga() {
  yield takeLatest('auth/google', GoogleSaga);
  yield takeLatest('auth/github', GithubSaga);
  yield takeLatest(userLogout.type, LogoutSaga);
}
