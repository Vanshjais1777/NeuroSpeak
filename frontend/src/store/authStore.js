import { create } from "zustand"
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,

    login: (userData, token) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        set({ user: userData, token });
    },

    logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        set({ user: null, token: null });
        toast.success("Logged out successfully");
    }
}));

export default useAuthStore;