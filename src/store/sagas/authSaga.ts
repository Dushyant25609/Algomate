import authService from '@/services/authService';
import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { loginFailure, logout, setLoading } from '../slices/userSlice';
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
    localStorage.removeItem('cookie');
    yield call(authService.logout);
    window.location.href = '/';
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Logout failed';
    yield put(loginFailure(errorMessage));
    // Ensure we still logout locally even if there's an error
    localStorage.removeItem('cookie');
    window.location.href = '/';
  }
}

export function* authSaga() {
  yield takeLatest('auth/google', GoogleSaga);
  yield takeLatest('auth/github', GithubSaga);
  yield takeLatest(logout.type, LogoutSaga);
}
