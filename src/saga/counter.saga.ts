import { put, takeLatest, delay } from "redux-saga/effects";
function* handleIncrease (action?: string){
    console.log("sagaFunction is running", action);
    yield delay(3000);
    yield put ({
        type: "counter/incrementSagaFinish",
        payload: 2
    })
}
function* handleDecrease (action?: string){
    console.log("sagaFunction is running", action);
    yield delay(3000);
    yield put ({
        type: "counter/decrementSagaFinish",
        payload: 2
    })
}

function* counterSaga() {
    console.log("counterSaga is running")
    yield takeLatest("counter/incrementSaga", handleIncrease)
    yield takeLatest("counter/decrementSaga", handleDecrease)
    // takeLeading / takeEvery / takeLatest
}
export default counterSaga;