import api from ".";

export const fetchAllUsers = async () => {
  try {
    const res = await api.get("/users");
    return res.data.users;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};
