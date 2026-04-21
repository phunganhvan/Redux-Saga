import { takeEvery } from "redux-saga/effects";
import { handleCreateUser, handleDeleteUser, handleFetchUser, handleUpdateUser } from "./userSagaFn/fetchUserFn";



function* userSaga() {
    // console.log("userSaga is running");
    yield takeEvery("user/fetchUserPending", handleFetchUser);
    yield takeEvery("user/createUserPending", handleCreateUser);
    yield takeEvery("user/updateUserPending", handleUpdateUser);
    yield takeEvery("user/deleteUserPending", handleDeleteUser);
}
export default userSaga;