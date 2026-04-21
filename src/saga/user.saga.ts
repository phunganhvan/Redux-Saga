import { call, takeEvery, put } from "redux-saga/effects";
import { IUser } from "../types/backend";
import { fetchUserError, fetchUserPending, fetchUserSuccess } from "../redux/user/user.slide";
import { createUserSuccess } from "../redux/user/user.slide";
import { PayloadAction } from "@reduxjs/toolkit";


const fetchUsers = async () => {
    const res = await fetch(`http://localhost:8000/users`);
    return res.json();
}

const createUser = async (payload: { email: string; name: string }) => {
    const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        body: JSON.stringify({
            email: payload.email,
            name: payload.name
        }),
        headers: {
            "Content-Type": " application/json"
        }
    });
    return res.json();
}


function* handleFetchUser() {
    // console.log("handleFetchUser is running");
    try {
        const users: IUser[] = yield call(fetchUsers);
        yield put(fetchUserSuccess({ data: users }));
        // Handle the fetched users
    } catch (error) {
        console.error("Error fetching users:", error);
        yield put(fetchUserError({ errors: error.message || "An error occurred while fetching users." }));
    }
}


function* handleCreateUser(action: PayloadAction<{ email: string; name: string }>) {
    // console.log("handleCreateUser is running");
    try {
        // Simulate an API call to create a user
        yield call(createUser, action.payload);
        yield put(createUserSuccess());
        // Handle the created user
        yield put(fetchUserPending());
    } catch (error) {
        console.error("Error creating user:", error);
        // Handle the error
        yield put(fetchUserError({ errors: error.message || "An error occurred while creating the user." }));
    }
}


function* userSaga() {
    // console.log("userSaga is running");
    yield takeEvery("user/fetchUserPending", handleFetchUser);
    yield takeEvery("user/createUserPending", handleCreateUser);
}
export default userSaga;