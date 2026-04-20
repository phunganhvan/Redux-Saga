import { takeEvery } from "redux-saga/effects";
function* handleFunction (action: any){
    console.log("sagaFunction is running", action);
}

function* counterSaga() {
    console.log("counterSaga is running")
    yield takeEvery("counter/increment", handleFunction)
}
export default counterSaga;