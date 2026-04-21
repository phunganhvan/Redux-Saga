import { takeEvery } from "redux-saga/effects";
import { handleCreateBlog, handleDeleteBlog, handleFetchBlog, handleUpdateBlog } from "./blogSagaFn/fetchBlogFn";

function* blogSaga() {
    yield takeEvery("blog/fetchBlogPending", handleFetchBlog);
    yield takeEvery("blog/createBlogPending", handleCreateBlog);
    yield takeEvery("blog/updateBlogPending", handleUpdateBlog);
    yield takeEvery("blog/deleteBlogPending", handleDeleteBlog);
}
export default blogSaga;