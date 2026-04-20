import { all } from "@redux-saga/core/effects";
import counterSaga from "./counter.saga";
import userSaga from "./user.saga";


function* RootSaga(){
    // console.log("RootSaga is running");
    yield all([
        counterSaga(),
        userSaga(),
    ])
}   
export default RootSaga;