import authService from '@/services/authService';
import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { loginFailure, logout, setLoading } from '../slices/userSlice';
import { clearAvatar } from '../slices/avatarSlice';
import { clearProfile } from '../slices/profileSlices';
import { clearFriend } from '../slices/friendSlices';
import { clearLeaderboard } from '../slices/leaderboardSlice';

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

    // Reset all states in the store
    yield put(clearAvatar()); // Reset avatar state
    yield put(clearProfile());
    yield put(clearLeaderboard());
    yield put(clearFriend());

    // Remove cookie and call logout API
    localStorage.removeItem('cookie');
    yield call(authService.logout);

    // Redirect to home page
    window.location.href = '/';
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Logout failed';
    yield put(loginFailure(errorMessage));

    // Reset all states in the store even if there's an error
    yield put(clearAvatar()); // Reset avatar state
    yield put(clearProfile());
    yield put(clearLeaderboard());
    yield put(clearFriend());

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
