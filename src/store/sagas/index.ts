// Root saga that combines all other sagas
import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { avatarSaga } from './avatarSaga';
import { userSaga } from './userSaga';
import { platformSaga } from './platformSaga';
import { countrySaga } from './countrySaga';
import { leaderboardSaga } from './leaderboardSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    avatarSaga(),
    platformSaga(),
    countrySaga(),
    leaderboardSaga(),
  ]);
}
