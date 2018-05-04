import { all } from 'redux-saga/effects'
import { addTaskWatcher } from './taskSagas/addTaskSaga';
import{ subscribeToTasksWatcher } from './taskSagas/subscribeToTasksSaga';

export default function* rootSaga() {
    yield all([
        addTaskWatcher(),
        subscribeToTasksWatcher()
    ]);
}