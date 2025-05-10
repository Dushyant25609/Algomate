import authService from '@/services/authService';
import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { loginFailure, logout } from '../slices/userSlice';
import { setLoading } from '../slices/loadingSlice';
// Remove the redirect import as we'll use window.location.href instead

export function* GoogleSaga(): Generator<CallEffect<void> | PutEffect, void, void> {
  yield put(setLoading(true));
  try {
    // Set loading to false before the redirect happens in googleAuth
    yield put(setLoading(false));
    yield call(authService.googleAuth);
    // The following code won't execute due to the redirect in googleAuth
    localStorage.setItem('cookie', 'true');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Google authentication failed';
    yield put(loginFailure(errorMessage));
    // Ensure loading is set to false in case of error
    yield put(setLoading(false));
  }
}

export function* GithubSaga(): Generator<CallEffect<void> | PutEffect, void, void> {
  yield put(setLoading(true));
  try {
    // Set loading to false before the redirect happens in githubAuth
    yield put(setLoading(false));
    yield call(authService.githubAuth);
    // The following code won't execute due to the redirect in githubAuth
    localStorage.setItem('cookie', 'true');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'GitHub authentication failed';
    yield put(loginFailure(errorMessage));
    // Ensure loading is set to false in case of error
    yield put(setLoading(false));
  }
}

export function* LogoutSaga(): Generator<CallEffect<void> | PutEffect, void, void> {
  yield put(setLoading(true));
  try {
    localStorage.removeItem('cookie');
    yield call(authService.logout);
    // Set loading to false before redirecting
    yield put(setLoading(false));
    window.location.href = '/';
    return; // Exit saga after redirect
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Logout failed';
    yield put(loginFailure(errorMessage));
    // Ensure we still logout locally even if there's an error
    localStorage.removeItem('cookie');
    // Ensure loading is set to false before redirecting
    yield put(setLoading(false));
    window.location.href = '/';
    return; // Exit saga after redirect
  }
}

export function* authSaga() {
  yield takeLatest('auth/google', GoogleSaga);
  yield takeLatest('auth/github', GithubSaga);
  yield takeLatest(logout.type, LogoutSaga);
}
