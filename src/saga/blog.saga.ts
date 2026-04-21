import { call, put, takeEvery } from "redux-saga/effects";
import { createBlogSuccess, fetchBlogError, fetchBlogPending, fetchBlogSuccess } from "../redux/blog/blog.slide";
import { IBlog } from "../types/backend";
import { PayloadAction } from "@reduxjs/toolkit";

const fetchBlogs = async () => {
    const res = await fetch("http://localhost:8000/blogs");
    return res.json();
}

const createBlog = async (payload: { title: string; author: string; content: string }) => {
    const res = await fetch("http://localhost:8000/blogs", {
        method: "POST",
        body: JSON.stringify({
            title: payload.title,
            author: payload.author,
            content: payload.content
        }),
        headers: {
            "Content-Type": " application/json"
        }
    });
    return res.json()
}

function* handleFetchBlog() {
    try {
        const blogs: IBlog[] = yield call(fetchBlogs);
        yield put(fetchBlogSuccess({ data: blogs }));
        // Handle the fetched blogs
    } catch (error) {
        console.error("Error fetching blogs:", error);
        yield put(fetchBlogError({ errors: error.message || "An error occurred while fetching blogs." }));
    }
}

function* handleCreateBlog(action: PayloadAction<{ title: string; author: string ; content: string}>) {
    try {
        yield call(createBlog, action.payload);
        yield put(createBlogSuccess());

        yield put(fetchBlogPending());
    } catch (error) {
        console.error("Error creating blog:", error);
        yield put(fetchBlogError({ errors: error.message || "An error occurred while creating the blog." }));
    }
}


function* blogSaga() {
    yield takeEvery("blog/fetchBlogPending", handleFetchBlog);
    yield takeEvery("blog/createBlogPending", handleCreateBlog);
}
export default blogSaga;