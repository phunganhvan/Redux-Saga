import { call, put, takeEvery } from "redux-saga/effects";
import { createBlogSuccess, deleteBlogSuccess, fetchBlogError, fetchBlogPending, fetchBlogSuccess, updateBlogSuccess } from "../redux/blog/blog.slide";
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

const updateBlog = async (payload: { id: number; title: string; author: string; content: string }) => {
    const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
        method: "PUT",
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

const deleteBlog = async (payload: { id: number }) => {
    const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
        method: "DELETE",
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

function* handleCreateBlog(action: PayloadAction<{ title: string; author: string; content: string }>) {
    try {
        yield call(createBlog, action.payload);
        yield put(createBlogSuccess());

        yield put(fetchBlogPending());
    } catch (error) {
        console.error("Error creating blog:", error);
        yield put(fetchBlogError({ errors: error.message || "An error occurred while creating the blog." }));
    }
}

function* handleUpdateBlog(action: PayloadAction<{ id: number; title: string; author: string; content: string }>) {
    try {
        yield call(updateBlog, action.payload);
        yield put(updateBlogSuccess());

        yield put(fetchBlogPending());
    } catch (error) {
        console.error("Error updating blog:", error);
        yield put(fetchBlogError({ errors: error.message || "An error occurred while updating the blog." }))
    }
}

function* handleDeleteBlog(action: PayloadAction<{ id: number }>) {
    try {
        yield call(deleteBlog, action.payload);
        yield put(deleteBlogSuccess());
        
        yield put(fetchBlogPending());
    } catch (error) {
        console.error("Error deleting blog:", error);
        yield put(fetchBlogError({ errors: error.message || "An error occurred while deleting the blog." }))
    }
}



function* blogSaga() {
    yield takeEvery("blog/fetchBlogPending", handleFetchBlog);
    yield takeEvery("blog/createBlogPending", handleCreateBlog);
    yield takeEvery("blog/updateBlogPending", handleUpdateBlog);
    yield takeEvery("blog/deleteBlogPending", handleDeleteBlog);
}
export default blogSaga;