import { call, takeEvery, put } from "redux-saga/effects";
import { IUser } from "../types/backend";
import { fetchUserError, fetchUserSuccess } from "../redux/user/user.slide";

const fetchUsers = async() => {
    const res = await fetch(`http://localhost:8000/users`);
    return res.json();
}

function* handleFetchUser() {
    // console.log("handleFetchUser is running");
    try {
        const users: IUser[] = yield call(fetchUsers);
        yield put(fetchUserSuccess({data: users}));
        // Handle the fetched users
    } catch (error) {
        console.error("Error fetching users:", error);
        yield put(fetchUserError({ errors: error.message || "An error occurred while fetching users." }));
    }
}

function* userSaga() {
    // console.log("userSaga is running");
    yield takeEvery("user/fetchUserPending", handleFetchUser);
}
export default userSaga;