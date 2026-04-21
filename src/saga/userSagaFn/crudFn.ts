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

const updateUser = async (payload: { id: number; email: string; name: string }) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
        method: "PUT",
        body: JSON.stringify({
            email: payload.email,
            name: payload.name,
        }),
        headers: {
            "Content-Type": " application/json"
        }
    });
    return res.json();
}
const deleteUser = async (payload: { id: number }) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": " application/json"
        }
    });
    return res.json();
}
export { fetchUsers, createUser, updateUser, deleteUser };