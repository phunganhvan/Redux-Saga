import { put, takeLatest, delay } from "redux-saga/effects";
import { incrementSagaFinish, decrementSagaFinish } from "../redux/counter/counter.slide";
function* handleIncrease (action?: string){
    console.log("sagaFunction is running", action);
    yield delay(3000);
    yield put(incrementSagaFinish({value: 2}))
}
function* handleDecrease (action?: string){
    console.log("sagaFunction is running", action);
    yield delay(3000);
    yield put(decrementSagaFinish({value: 2}))
}

function* counterSaga() {
    console.log("counterSaga is running")
    yield takeLatest("counter/incrementSaga", handleIncrease)
    yield takeLatest("counter/decrementSaga", handleDecrease)
    // takeLeading / takeEvery / takeLatest
}
export default counterSaga;