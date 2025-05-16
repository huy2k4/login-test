import { call, put, takeLatest } from 'redux-saga/effects';
import { login, getCurrentUser, logout } from '../api';
import { loginSuccess, loginFailure, setUser, setAuthError } from '../toonkit/userSlice';

function* loginUser(action) {
  try {
    const response = yield call(login, action.payload);
    yield put(loginSuccess(response.user));
    
    // Lưu token đã được xử lý trong api.js
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* fetchCurrentUser() {
  try {
    const user = yield call(getCurrentUser);
    yield put(setUser(user));
  } catch (error) {
    yield put(setAuthError(error.message));
    yield call(logout);
  }
}

export function* watchUserLogin() {
  yield takeLatest('user/loginRequest', loginUser);
}

export function* watchFetchCurrentUser() {
  yield takeLatest('user/fetchCurrentUserRequest', fetchCurrentUser);
}