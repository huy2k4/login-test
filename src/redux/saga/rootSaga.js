import { all } from 'redux-saga/effects';
import { watchUserLogin, watchFetchCurrentUser } from './usersaga';

export default function* rootSaga() {
  yield all([
    watchUserLogin(),
    watchFetchCurrentUser()
  ]);
}