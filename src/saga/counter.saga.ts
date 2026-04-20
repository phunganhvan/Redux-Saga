import { put, takeEvery, takeLatest } from "redux-saga/effects";
function* handleIncrease (action: any){
    console.log("sagaFunction is running", action);
    // yield delay(3000);
    yield put ({
        type: "counter/incrementSagaFinish",
        payload: 2
    })
}

function* counterSaga() {
    console.log("counterSaga is running")
    yield takeLatest("counter/incrementSaga", handleIncrease)
    // takeLeading / takeEvery / takeLatest
}
export default counterSaga;