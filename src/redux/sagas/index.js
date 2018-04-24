import { all } from 'redux-saga/effects'
import { addTaskWatcher } from './taskSagas/addTaskSaga';

export default function* rootSaga() {
    yield all([
        addTaskWatcher()
    ]);
}