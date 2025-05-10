import { PayloadAction } from '@reduxjs/toolkit';
import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { AvatarConfig, AvatarConfig2 } from '@/interface/avatar';
import { avatarService } from '@/services/avatarService';
import {
  createAvatarRequest,
  createAvatarSuccess,
  createAvatarFailure,
  getAvatarRequest,
  getAvatarSuccess,
  getAvatarFailure,
  updateAvatarRequest,
  updateAvatarSuccess,
  updateAvatarFailure,
  AvatarAction,
} from '../slices/avatarSlice';
import { setLoading } from '../slices/loadingSlice';

type AvatarSagaEffect =
  | CallEffect<AvatarConfig | AvatarConfig2 | void>
  | PutEffect<{ type: string; payload: AvatarConfig | AvatarConfig2 | string | void | boolean }>;

// Worker Sagas
function* createAvatarSaga(
  action: PayloadAction<AvatarConfig | AvatarConfig2>
): Generator<AvatarSagaEffect, void, AvatarConfig | AvatarConfig2> {
  yield put(setLoading(true));
  try {
    const response = yield call(avatarService.createAvatar, action.payload);
    yield put(createAvatarSuccess(response));
  } catch (error) {
    yield put(
      createAvatarFailure(error instanceof Error ? error.message : 'Failed to create avatar')
    );
  }
  yield put(setLoading(false));
}

function* getAvatarSaga(): Generator {
  yield put(setLoading(true));
  try {
    const response = yield call(avatarService.getAvatar);
    if (response.status && response.status === 404) {
      yield put(createAvatarRequest());
      return;
    }
    yield put(getAvatarSuccess(response));
  } catch (error) {
    yield put(getAvatarFailure(error instanceof Error ? error.message : 'Failed to get avatar'));
  }
  yield put(setLoading(false));
}

function* updateAvatarSaga(action: PayloadAction<AvatarConfig>): Generator {
  yield put(setLoading(true));
  try {
    const response = yield call(avatarService.updateAvatar, action.payload);
    yield put(updateAvatarSuccess(response));
  } catch (error) {
    yield put(
      updateAvatarFailure(error instanceof Error ? error.message : 'Failed to update avatar')
    );
  }
  yield put(setLoading(false));
}

// Watcher Saga
export function* avatarSaga() {
  yield takeLatest(AvatarAction().type, createAvatarSaga);
  yield takeLatest(getAvatarRequest.type, getAvatarSaga);
  yield takeLatest(updateAvatarRequest().type, updateAvatarSaga);
}
