import { call, put } from "redux-saga/effects";
import { createBlogSuccess, deleteBlogSuccess, fetchBlogError, fetchBlogPending, fetchBlogSuccess, updateBlogSuccess } from "../../redux/blog/blog.slide";
import { IBlog } from "../../types/backend";
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from "./crudBlogFn";

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

export { handleFetchBlog, handleCreateBlog, handleUpdateBlog, handleDeleteBlog };