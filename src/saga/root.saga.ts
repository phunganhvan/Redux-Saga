import { all } from "@redux-saga/core/effects";
import counterSaga from "./counter.saga";


function* RootSaga(){
    console.log("RootSaga is running");
    yield all([
        counterSaga(),
    ])
}   
export default RootSaga;