import { LeaderboardPagination, LeaderboardResponse } from '@/interface/leaderboard';
import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchLeaderboardFailure,
  fetchLeaderboardSuccess,
  fetchFilteredLeaderboardRequest,
  fetchLeaderboardRequest,
} from '../slices/leaderboardSlice';
import leaderboardService, { LeaderboardServiceError } from '@/services/leaderboardService';

// Define saga effect types
type LeaderboardSagaEffect =
  | CallEffect<LeaderboardResponse | string | LeaderboardServiceError>
  | PutEffect<{ type: string; payload: LeaderboardResponse | string | LeaderboardServiceError }>;

// Saga for fetching leaderboard data
function* fetchLeaderboardSaga(): Generator<
  LeaderboardSagaEffect,
  void,
  LeaderboardResponse | LeaderboardServiceError | string
> {
  try {
    const response = yield call(leaderboardService.getLeaderboard);
    yield put(fetchLeaderboardSuccess(response as LeaderboardResponse));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch leaderboard data';
    yield put(fetchLeaderboardFailure(errorMessage));
  }
}

// Saga for fetching filtered leaderboard data
function* fetchFilteredLeaderboardSaga(
  action: PayloadAction<LeaderboardPagination>
): Generator<LeaderboardSagaEffect, void, LeaderboardResponse> {
  try {
    const response: LeaderboardResponse = yield call(
      leaderboardService.getFilteredLeaderboard,
      action.payload
    );
    yield put(fetchLeaderboardSuccess(response));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch filtered leaderboard data';
    yield put(fetchLeaderboardFailure(errorMessage));
  }
}

// Watch for leaderboard actions
export function* leaderboardSaga() {
  yield takeLatest(fetchLeaderboardRequest.type, fetchLeaderboardSaga);
  yield takeLatest(fetchFilteredLeaderboardRequest.type, fetchFilteredLeaderboardSaga);
}
