import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { platformService, PlatformServiceError } from '@/services/platformService';
import {
  generateVerificationSuccess,
  generateVerificationFailure,
  saveVerificationSuccess,
  saveVerificationFailure,
  PlatformGenerateAction,
  PlatformVerifyAction,
  DeletePlatform,
} from '../slices/platformSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { SaveVerificationRequest, VerificationResponse } from '@/interface/verify';
import { Platform } from '@/interface/platform';
import { setLoading } from '../slices/loadingSlice';

type VerificationSagaEffect =
  | CallEffect<VerificationResponse | string | PlatformServiceError>
  | PutEffect<{
      type: string;
      payload: VerificationResponse | string | PlatformServiceError | boolean;
    }>;

type VerifiedSagaEffect =
  | CallEffect<void | string | PlatformServiceError>
  | PutEffect<{
      type: string;
      payload: SaveVerificationRequest | string | PlatformServiceError | void | boolean;
    }>;

function* generateVerificationSaga(
  action: PayloadAction<string>
): Generator<VerificationSagaEffect, void, VerificationResponse | PlatformServiceError> {
  try {
    const response = yield call(platformService.generateVerificationCode, action.payload);
    if ('status' in response) {
      // Handle error response
      const error = response as PlatformServiceError;
      yield put(generateVerificationFailure(error.message));
    } else {
      yield put(generateVerificationSuccess(response as VerificationResponse));
    }
  } catch (error) {
    let errorMessage = 'Failed to generate verification code';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(generateVerificationFailure(errorMessage));
  }
}

function* saveVerificationSaga(
  action: PayloadAction<string>
): Generator<VerifiedSagaEffect, void, SaveVerificationRequest | PlatformServiceError | void> {
  yield put(setLoading(true));
  try {
    yield call(platformService.saveVerificationCode, action.payload);
    yield put(saveVerificationSuccess());
    window.location.reload();
  } catch (error) {
    let errorMessage = 'Failed to save verification code';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(saveVerificationFailure(errorMessage));
  }
  yield put(setLoading(false));
}

function* deletePlatformSaga(action: PayloadAction<Platform>) {
  yield put(setLoading(true));
  try {
    yield call(platformService.deleteUserPlatformData, action.payload);
  } catch (error) {
    let errorMessage = 'Failed to delete platform';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(saveVerificationFailure(errorMessage));
  }
  yield put(setLoading(false));
}

export function* platformSaga() {
  yield takeLatest(PlatformGenerateAction().type, generateVerificationSaga);
  yield takeLatest(PlatformVerifyAction().type, saveVerificationSaga);
  yield takeLatest(DeletePlatform().type, deletePlatformSaga);
}
