import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AvatarConfig } from '@/interface/avatar';
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
  setLoading,
} from '../slices/avatarSlice';

// Worker Sagas
function* createAvatarSaga(action: PayloadAction<AvatarConfig>): Generator {
  try {
    yield setLoading();
    yield put(createAvatarRequest());
    const response = yield call(avatarService.createAvatar, action.payload);
    yield put(createAvatarSuccess(response));
    window.location.href = '/';
  } catch (error) {
    yield put(
      createAvatarFailure(error instanceof Error ? error.message : 'Failed to create avatar')
    );
  }
}

function* getAvatarSaga(): Generator {
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
}

function* updateAvatarSaga(action: PayloadAction<AvatarConfig>): Generator {
  try {
    const response = yield call(avatarService.updateAvatar, action.payload);
    yield put(updateAvatarSuccess(response));
  } catch (error) {
    yield put(
      updateAvatarFailure(error instanceof Error ? error.message : 'Failed to update avatar')
    );
  }
}

// Watcher Saga
export function* avatarSaga() {
  yield takeLatest(AvatarAction().type, createAvatarSaga);
  yield takeLatest(getAvatarRequest.type, getAvatarSaga);
  yield takeLatest(updateAvatarRequest.type, updateAvatarSaga);
}
