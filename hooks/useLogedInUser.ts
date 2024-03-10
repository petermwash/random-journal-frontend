import { create } from "zustand";
import { User } from "../types";

interface LogedInUserStore {
  user: User;
  onUpdateUser: (user: User) => void;
  onRemoveUser: () => void;
}

const useLogedInUser = create<LogedInUserStore>((set) => ({
  user: null,
  onUpdateUser: (user: User) => set({ user: user }),
  onRemoveUser: () => set({ user: null }),
}));

export default useLogedInUser;
