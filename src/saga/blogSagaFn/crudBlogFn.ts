
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

export { fetchBlogs, createBlog, updateBlog, deleteBlog };