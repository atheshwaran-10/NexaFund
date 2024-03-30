import {create} from "zustand";

type State = {
  value: string;
  setValue: (newValue: string) => void;
};

const useStore = create<State>((set) => ({
  value: "",
  setValue: (newValue: string) => set((state) => ({ value: newValue })),
}));

export default useStore;
