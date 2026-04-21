import { PayloadAction } from "@reduxjs/toolkit";
import { loginPending, logout } from "../redux/user/user.slide";
import { call, fork, take } from "@redux-saga/core/effects";
import { ILogin } from "../types/backend";

const authorize = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "admin@gmail.com" && password === "admin") {
                localStorage.setItem("access_token", "fake_token");
                resolve("token");
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 3000);
    });

}

function* authSaga() {
    while (true) {
        const action: PayloadAction<ILogin> = yield take(loginPending);
        yield take(loginPending);
        // yield call(authorize, action.payload.email, action.payload.password);
        yield fork(authorize, action.payload.email, action.payload.password);

        yield take(logout);

    }
}
export default authSaga;