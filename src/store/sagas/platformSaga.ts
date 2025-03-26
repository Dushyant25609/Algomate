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

type VerificationSagaEffect =
  | CallEffect<VerificationResponse | string | PlatformServiceError>
  | PutEffect<{ type: string; payload: VerificationResponse | string | PlatformServiceError }>;

type VerifiedSagaEffect =
  | CallEffect<void | string | PlatformServiceError>
  | PutEffect<{
      type: string;
      payload: SaveVerificationRequest | string | PlatformServiceError | void;
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
  try {
    yield call(platformService.saveVerificationCode, action.payload);
    yield put(saveVerificationSuccess());
  } catch (error) {
    let errorMessage = 'Failed to save verification code';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(saveVerificationFailure(errorMessage));
  }
}

function* deletePlatformSaga(action: PayloadAction<Platform>) {
  try {
    yield call(platformService.deleteUserPlatformData, action.payload);
  } catch (error) {
    let errorMessage = 'Failed to delete platform';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(saveVerificationFailure(errorMessage));
  }
}

export function* platformSaga() {
  yield takeLatest(PlatformGenerateAction().type, generateVerificationSaga);
  yield takeLatest(PlatformVerifyAction().type, saveVerificationSaga);
  yield takeLatest(DeletePlatform().type, deletePlatformSaga);
}
